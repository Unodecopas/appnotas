# Appnotas

## ANÓNIMO:

- Login: usando email + contraseña
- Registro: pide email + contraseña

## USUARIOS REGISTRADOS:

- Ver su listado de notas (en el listado sólo se ven los títulos)
- Visualizar una nota
- Crear una nota: título, texto y categoría única (fijas).
- Modificar sus notas: título, texto y categoría

### Opcional:

- Marcar una nota como pública:
  Por defecto todas las notas son privadas y solo puede verlas el usuario que las creó, pero sí una nota se marca como pública esta se puede ver por
  cualquier usuario esté registrado y logueado en la aplicación o no. Las notas
  públicas sólo se puede acceder si se conoce la URL.
- Eliminar una nota
- Crear, editar y borrar categorías
- Imagen: poder asociar una imagen (única) a cada nota

## SCRIPTS

- Instalación:

        npm install

- Crear variables de entorno, creando archivo .env (se proporcina un archivo envEXAMPLES con lo requerido)

- Creación base de datos e introducir datos de prueba:

        npm run resetDB

- Iniciar servidor:

        npm run dev

- Swagger:

        http://localhost:4000/api-docs

## ENDPOINTS

<img src="./images/swagger-list.png" alt="preview">
