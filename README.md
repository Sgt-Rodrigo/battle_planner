------- Site info & Proyect clarifications for Examiner --------
(version español al final) 

### What is this site? ###
-This is a Milsim community plattform (Milsim = military simulation) used mainly to shcedule 'deployments' (appointments) to participate in events organized by various airsoft fields around the world.
-Users must register and log in to reserve a spot.


### Site Navigation ###

** as Guest
-Home > main page
-Register > register form
-Login > login form

** as Logged member
-Home > main page
-My-Deployments > 'appointments/Turnos' table
-Request-Deployment > 'schedle appointment/Pedir turno' form
-LogOut > quit personal account

** non-working/mock pages
-About Us / Contact Us / Privacy Policy >  redirects to 404.page 



#### Proyect clarifications ####

## Back-end
-for 'usersRouter.get('/', auth, getUsers)' > remember you need a token with value 'authenticated' (unquoted).
-implements Json-server for mock database (check script in package.json)
-extra-credict > sets up basic mailer using nodemailer (NON-FUNCTIONAL, still on the works) > 'less secure apps' option is obsolete since september 2023.


## Front-end
*** Proyect implements > 
-Typescript with React and swc (rust compilation): although it wasn't demanded by the assignment
I decided to use TS in the front-end also to keep consistency and practice.
-Sass
-React-Bootstrap components
-Json-Server for mock database

***React Router : 
-Uses the newest recommended implementation by the official docs >  createBrowserRouter([]) passing an array of route objects.
-Uses nested routes along with 1 (one) main layout (NavBar + <Outlet> + Footer) to display across the different views.



##### español #####

### ¿Qué es este sitio? ###
- Esta es una plataforma de comunidad Milsim (simulación militar) utilizada principalmente para programar 'despliegues' ('turnos') para participar en eventos organizados por varios campos de airsoft alrededor del mundo.
- Los usuarios deben registrarse e iniciar sesión para reservar un lugar.

### Navegación del sitio ###

** como invitado
- Home > página principal
- Register > formulario de registro
- Log in > formulario de inicio de sesión

** como miembro registrado
- Home > página principal
- My-Deployments > tabla de 'citas/Turnos'
- Request-Deployment > formulario para 'solicitar cita/Pedir turno'
- LogOut > salir de la cuenta personal

** páginas no funcionales/ficticias
-About Us / Contact Us / Privacy Policy > redirige a página 404.

#### Aclaraciones del Proyecto ####

## Back-end
-para 'usersRouter.get('/', auth, getUsers)' > se requiere enviar token con valor 'authenticated' (sin comillas)
-implementa Json-server para base de datos provisoria.
-extra-credit: el mailer esta seteado pero no funciona aun, requiere otros metodos de autenticacion desde que google dejó obsoleta la opcion 'less secure apps'


## Front-end
*** Implementaciones del Proyecto > 
- Typescript con React y swc (compilación en rust): aunque no era requerido por la tarea, decidí usar TS en el front-end también para mantener consistencia y practicar.
- Sass
- Componentes de React-Bootstrap
- Json-Server para base de datos simulada

*** React Router : 
- Utiliza la implementación más nueva y recomendada por la documentación oficial >  createBrowserRouter([]) pasando un array de objetos de ruta.
- Utiliza rutas anidadas junto con 1 (un) layout principal (NavBar + <Outlet> + Footer) para mostrar a través de las diferentes vistas.
