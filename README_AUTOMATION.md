# SecureAuthRN — React Native + .NET 8 (Autenticación Segura)

Aplicación móvil con arquitectura limpia, autenticación segura y backend en .NET 8.  
Frontend construido con **React Native (TypeScript)**, **TanStack Query**, **Zustand**, y **Encrypted Storage**.

---

## 🌳 Arquitectura por capas

Presentation │ (pantallas, navegación, hooks, validación UI, providers) │
usa
Application │ (casos de uso / orquestadores, lógica de flujo) │
depende de (contratos)
Domain │ (entidades, interfaces de repositorios, negocio) │
implementa
Data + Infra │ Data: Repositories que implementan interfaces del Domain │ Infra: Services (HTTP/Axios), Adapters (EncryptedStorage) │


**Flujo principal:**  
`UI (Pantalla) → Repository (Data) → Service (Infra) → API (.NET)`  
y la respuesta vuelve → estado (Zustand/TanStack Query) → UI.

---

## 📁 Estructura del proyecto

src/
application/ # (opcional) casos de uso o controladores
domain/
entities/ # User, AuthResult, etc.
repositories/ # Interfaces (AuthRepository)
data/
repositories/ # AuthRepositoryImpl
infrastructure/
services/ # AuthService (Axios)
adapters/ # SecureStorageAdapter (EncryptedStorage)
factories/ # makeAuthRepository()
presentation/
navigation/ # AppNavigator, stacks protegidos
providers/ # AuthProvider, QueryClientProvider
screens/ # Login, Register, Home
state/ # authStore (Zustand)


---

## 🔐 Decisiones de seguridad

- Token almacenado en **EncryptedStorage** (Keychain/Keystore).
- **Logout** elimina completamente los datos cifrados.
- **Stack protegido**: el usuario no accede a pantallas privadas sin token.
- **Validaciones** con Formik + Yup (en login/registro).
- En backend Dev se usa HTTP; en producción, **HTTPS obligatorio** con certificado válido.

---

## ▶️ Correr el backend (Dev HTTP)

1. Abre PowerShell:
```powershell
cd backend/SecureAuth.Api
$env:ASPNETCORE_ENVIRONMENT="Development"
dotnet run --urls "http://0.0.0.0:5000"

📱 Correr la app móvil

Instala dependencias:

npm install


Inicia Metro:

npx react-native start --reset-cache


En otra consola:

npx react-native run-android

🔗 Configurar conexión con el backend

En src/infrastructure/services/httpClient.ts:

export const BASE_URL = 'http://10.0.2.2:5000';


En android/app/src/main/AndroidManifest.xml dentro de <application>:

android:usesCleartextTraffic="true"