using BCrypt.Net;
using Microsoft.AspNetCore.HttpOverrides;
using System.Security.Claims;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(o =>
{
    o.AddPolicy("allow-dev", p => p
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod());
});

var app = builder.Build();

//app.UseHttpsRedirection();
app.UseCors("allow-dev");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// In-memory users
var users = new Dictionary<string, (string Hash, string Name)>(StringComparer.OrdinalIgnoreCase);

app.MapPost("/register", (RegisterRequest req) =>
{
    if (string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrWhiteSpace(req.Password))
        return Results.BadRequest(new { message = "Email y password requeridos" });

    if (users.ContainsKey(req.Email))
        return Results.Conflict(new { message = "Usuario ya existe" });

    var hash = BCrypt.Net.BCrypt.HashPassword(req.Password);
    users[req.Email] = (hash, req.Name ?? req.Email);

    return Results.Ok(new { message = "Registrado" });
});

app.MapPost("/login", (LoginRequest req) =>
{
    if (!users.TryGetValue(req.Email, out var u))
        return Results.Unauthorized();

    var ok = BCrypt.Net.BCrypt.Verify(req.Password, u.Hash);
    if (!ok) return Results.Unauthorized();

    var token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
    var user = new { id = Guid.NewGuid(), email = req.Email, name = u.Name };

    return Results.Ok(new { token, user });
});

app.MapGet("/me", (HttpContext ctx) =>
{
    var auth = ctx.Request.Headers.Authorization.ToString();
    if (string.IsNullOrWhiteSpace(auth)) return Results.Unauthorized();
    return Results.Ok(new { id = Guid.NewGuid(), email = "demo@example.com", name = "Demo" });
});

app.Run();

record RegisterRequest(string Email, string Password, string? Name);
record LoginRequest(string Email, string Password);
