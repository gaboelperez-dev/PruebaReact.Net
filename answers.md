# Answers — Teoría
1) Principales amenazas en apps móviles y cómo prevenirlas

Una app móvil puede tener varios riesgos, por ejemplo:

Robo de tokens o credenciales: se puede evitar guardando todo en un almacenamiento seguro como Keychain o Keystore (usando algo como EncryptedStorage), además de que los tokens tengan expiración corta y se borren bien al cerrar sesión.

Interceptación del tráfico (MITM): se soluciona usando siempre HTTPS, certificados válidos y, si es posible, aplicar pinning en producción.

Ingeniería inversa o manipulación del código: para eso se ofuscan las builds de release y se valida la integridad del dispositivo (SafetyNet o DeviceCheck).

Abuso del API: se controla con OAuth/OIDC, límites de peticiones, validaciones desde el backend y buen manejo de CORS.

Inyecciones o inputs inseguros: se previenen validando los datos tanto en cliente como en servidor.

2) Diferencias de almacenamiento seguro entre iOS y Android

En iOS, el Keychain guarda los datos cifrados por hardware y tiene clases de protección para controlar el acceso.
En Android, se usa el Keystore junto con EncryptedSharedPreferences, donde la clave de cifrado está protegida.
En proyectos multiplataforma (como React Native), usamos librerías como react-native-encrypted-storage que funcionan igual en ambos sistemas.
En resumen: nunca se deben guardar tokens en AsyncStorage, sino en almacenamiento seguro.

3) ¿Qué es el patrón Adapter y cómo se aplica con EncryptedStorage?

El Adapter sirve para adaptar una librería o dependencia a la interfaz que espera nuestra app.
En este caso, el SecureStorageAdapter envuelve react-native-encrypted-storage y expone funciones genéricas como getItem, setItem, removeItem, etc.
La ventaja es que si después queremos cambiar de librería o tecnología, no tenemos que modificar todo el código, solo el adapter. Además, facilita hacer pruebas unitarias porque se puede mockear.

4) ¿Por qué usar React Query en lugar de Redux para peticiones async?

React Query es ideal para manejar datos que vienen del servidor porque ya trae cosas como cache, reintentos, sincronización y manejo automático de estados (loading, error, success).
En cambio, Redux se usa más para manejar estado local de la app y, para hacer peticiones, hay que agregar middleware o escribir más código.
En resumen, React Query hace más fácil y limpio manejar las peticiones sin tanto código repetitivo.

5) ¿Qué patrón usar para encapsular reglas de negocio y por qué?

Usaría una arquitectura limpia (Clean Architecture) con casos de uso.
Por ejemplo, cada acción importante (como LoginUser) tendría su propio caso de uso, donde se maneja la lógica y se conectan las capas de dominio y datos.
Esto ayuda a que la lógica esté separada del UI, sea más fácil de probar, y que si se cambia la API o la base de datos, no afecte el resto del sistema.