# Proyecto_FInal

InstaYa - Aplicación de Servidor
Dependencias:
Esta aplicación web (de lado del servidor), se encuentra desarrollada con las siguientes tecnologías:

express, nos permite generar y ejecutar nuestro servidor
cookie-parser, para poder interactuar con las cookies en los encabezados de nuestras solicitudes y respuestas http
cors, para definir la lista de hosts o clientes web permitidos
helmet, para generar encabezados con respecto a nuestras solicitudes y respuestas
morgan, para mostrar en consola de forma automatizada los logs de nuestro servidor asi mismo como poder escribirlos en un archivo
mongoose, para conectarnos a un cluster MongoDB
mongoose-sequence, para generar de una forma sencilla un indice de con auto-incremento en MongoDB
argon2, para poder hashear las contraseñas de nuestros usuarios
jsonwebtoken, para poder autenticar a nuestros usuarios, en este proyecto manejaremos la autenticación por medio de 2 tokens uno de refresco con larga duración (7 días), y uno de acceso con corta duración (15 minutos)
zod, para validar objetos json de una forma rápida y sencilla
Y también cuenta con otras tecnologías para facilitar la experiencia como desarrollador:

babel, el cual nos permite tener sintaxis de ECMAScript moderno, como por ejemplo usar import export en nuestros archivos sin la necesidad de incluir archivos innecesarios en las rutas o sus extensiones
eslint, para validar estándares y reglas de formato en nuestro código
prettier, para darle formato a nuestro código de forma automática
husky, para ejecutar comandos antes de hacer commit con nuestros cambios
lint-staged, para ejecutar comandos tomando en cuenta solo los archivos en el área de stage
nodemon, el cual nos permite reiniciar nuestro servidor con cada cambio que realicemos en algún archivo
Comandos
Este proyecto cuenta con los siguientes comandos:

clean
build:babel
build
start
dev
lint
lint:fix
prettier:fix
prettier:check
Para ejecutar algún, por lo general usaremos npm run <comando>, estaremos trabajando la mayor parte del tiempo con el comando npm run dev.

Configuración
Entorno Local
Primero que todo, vamos a crear un archivo en la raíz de nuestro proyecto que se llame nodemon.json, con la finalidad de definir variables de entorno de forma local, este archivo contara con la siguiente estructura:

{
	"env": {
		// no usaremos 3000 puesto que puede generar problemas con nuestro cliente web.
		"PORT": "<puerto del servidor>",
		// nombre del archivo donde generaremos nuestros logs con morgan
		"LOG_ACCESS": "dev.log",
		// cadena de conexión a nuestra bases de datos en mongo
		"DB_CONNECTION_STRING": "<mongodb_srv_connection_string>",
		// valor de la propiedad "kid" de nuestro par de llaves de acceso
		"ACCESS_TOKEN_SECRET": "<kid_header_value>",
		// valor de la propiedad "kid" de nuestro par de llaves de refresco
		"REFRESH_TOKEN_SECRET": "<kid_header_value>",
		// host de nuestro cliente, como este sera un entorno local, debemos permitir conexiones que provengan desde nuestro cliente local
		"ALLOWED_HOST": "http://localhost:3000"
	}
}
Por último, vamos a necesitar configurar nuestras llaves privadas y publicas para poder firmar los tokens JWT, que vamos a utilizar para autenticar a nuestros usuarios.

Para esto, vamos a necesitar dirigirnos a la siguiente herramienta en línea, en donde:

Marcaremos el algoritmo (JWS Algo) con la opción ES256 ya que estamos utilizando un algoritmo ECDSA para generar nuestros tokens, para más información con respecto a los algoritmos de cifrado ver este artículo
Llenaremos el campo Payload siguiente JSON para generar nuestro par de llaves de refresco:
{
	"type": "refresh"
}
Hacemos click en "Generar JWS Keys".
Crearemos una carpeta que llame keys dentro de nuestra carpeta raíz
Guardamos la info de nuestra refresh key:
Copiaremos el valor de la propiedad kid de la sección Header en nuestra variable de entorno local en la variable REFRESH_TOKEN_SECRET en nodemon.json
Crearemos el archivo refresh.private.pem en el folder keys que acabamos crear con el contenido de la sección Private Key
Crearemos el archivo refresh.public.pem en el folder keys que acabamos crear con el contenido de la sección Public Key
Subimos hasta la sección de payload y reemplazaremos el contenido JSON por el siguiente:
{
	"type": "access"
}
Hacemos click en "Generar JWS Keys".
Guardamos la info de nuestra refresh key:
Copiaremos el valor de la propiedad kid de la sección Header en nuestra variable de entorno local en la variable ACCESS_TOKEN_SECRET en nodemon.json
Crearemos el archivo access.private.pem en el folder keys que acabamos crear con el contenido de la sección Private Key
Crearemos el archivo access.public.pem en el folder keys que acabamos crear con el contenido de la sección Public Key
Entorno Productivo
Es necesario haber configurado previamente las llaves privadas públicas para poder seguir con estas configuraciones.

Antes de realizar el despliegue de nuestro servidor, es necesario configurar las variables de entorno que usaremos.

Por lo que hemos de necesitar acceso a la plataforma en al que haremos nuestros despliegues:

Necesitamos crear una cuenta en Fly
Hacemos click en Sign In, lo cual nos llevara al inicio de sesión, podemos iniciar sesión con github
No es necesario introducir ningún método de pago, ya que podemos omitirlo
Instalaremos la interfaz por consola de Fly, Fly CTL
Una vez descargado Fly CTL, iniciaremos sesión desde nuestra terminal con el comando fly auth login
Ahora podremos configurar todas nuestras variables de entorno con el comando fly secrets set VARIABLE_DE_ENTORNO="VALOR_VARIABLE_DE_ENTORNO", por ejemplo: fly secrets set ALLOWED_HOST=https://insta-ya.netlify.app
Es probable que para la variable de conexión a base de datos toque envolver el valor entre comillas debido a sus caracteres especiales.
Despliegue
Para realizar el despliegue estaremos siguiendo paso a paso las instrucciones en la página de Fly.

Necesitaremos haber configurado todas nuestras variables de entorno según lo explicado en Configuración
Ejecutaremos el comando fly launch, aquí Fly se dará cuenta de que contamos con un Dockerfile y con un archivo de configuración fly.toml por lo que nos preguntara si queremos mantener estas configuraciones, a lo que deberemos responder que si
Ejecutaremos el comando fly deploy
Una vez haya terminado el despliegue ejecutaremos fly status para revisar el estado de nuestro despliegue
Finalmente ejecutaremos fly open para ver la URL de nuestra API
Es posible que al abrir la url nos salte un error, pero si nos dirigimos a '/api' podremos ver el mensaje de "hola mundo" que tenemos configurado

InstaYa - Cliente Web
Dependencias:
Esta aplicación web se encuentra desarrollada con las siguientes tecnologías:

vite, para compilar nuestro proyecto
vite-plugin-svgr, para añadir iconos en formato .svg
react, para definir la interfaz en forma de componentes reutilizables
react-router, para definir las rutas y navegación de nuestras vistas
react-toastify, para generar "notificaciones" en nuestras vistas
lottie-react, para añadir animaciones en formato lottie
@datepicker-react/hooks, para extrapolar la lógica de un calendario y solo preocuparnos en construir los componentes visuales
axios, para consumir recursos REST por medio de peticiones http
zod, para validar objetos json de una forma rápida y sencilla
Y también cuenta con otras tecnologías para facilitar la experiencia como desarrollador:

eslint, para validar estándares y reglas de formato en nuestro código
prettier, para darle formato a nuestro código de forma automática
tailwindcss, para estilizar nuestra interfaz gráfica
husky, para ejecutar comandos antes de hacer commit con nuestros cambios
lint-staged, para ejecutar comandos tomando en cuenta solo los archivos en el área de stage
Comandos
Este proyecto cuenta con los siguientes comandos:

dev
build
preview
lint
lint:fix
prettier:fix
prettier:check
Para ejecutar algún, por lo general usaremos npm run <comando>, estaremos trabajando la mayor parte del tiempo con el comando npm run dev.

Configuración
Entorno Local
Es necesario configurar las variables de entorno del proyecto para que este pueda funcionar adecuadamente en un entorno local. Para esto, crearemos el archivo .env.development.local en la carpeta raíz del proyecto con el siguiente contenido:

# .env.development

VITE_API_URL=<Url a nuestra API>
Entorno productivo
Una vez realizado el paso de despliegue, debemos de configurar las variables de entorno en nuestro proyecto, para esto podemos ejecutar el comando netlify env:set VITE_API_URL <host_de_nuestra_api>.

Despliegue
Para realizar el despliegue estaremos siguiendo paso a paso las instrucciones en la página de vite.

Necesitaremos crear una cuenta en Netlify, se puede usar una cuenta de Google o una cuenta de Github
Descargaremos el cliente por consola de Netlify (Netlify CLI)
Esto lo podemos hacer ejecutando el comando npm install netlify-cli -g
Crearemos un nuevo sitio en Netlify con el comando ntl init, con esto Netlify CLI nos preguntara un par de cosas como:
Nuestro usuario de Netlify, hará un proceso de inicio de sesión automatizado con nuestro navegador web, en el cual solo deberemos de seguir el paso a paso
Nos va a preguntar si queremos actualizar un sitio o crear un sitio, por lo que aquí seleccionaremos Create & configure a new site
El nombre de nuestro sitio, en este caso yo use: insta-ya
El comando para compilar el proyecto: npm run build
La carpeta donde se encuentran nuestros archivos compilados: dist
Por ultimo, desplegaremos nuestro sitio con el comando ntl deploy, para esto seguiremos los siguientes pasos:
Se nos generara una URL de borrador donde se encuentra nuestro sitio.
Si todo se ve bien en nuestro borrador entonces ejecutaremos el comando netlify deploy --prod, con el motivo de realizar una entrega o release de nuestros cambios a productivo.
