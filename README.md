# sv

Todo lo que necesitas para construir un proyecto Svelte, potenciado por [`sv`](https://github.com/sveltejs/cli).

## Creando un proyecto

Si estás viendo esto, probablemente ya hayas completado este paso. ¡Felicidades!

```bash
# crear un nuevo proyecto en el directorio actual
npx sv create

# crear un nuevo proyecto en my-app
npx sv create my-app
```

## Desarrollo

Una vez que hayas creado un proyecto e instalado las dependencias con `npm install` (o `pnpm install` o `yarn`), inicia un servidor de desarrollo:

```bash
npm run dev

# o inicia el servidor y abre la aplicación en una nueva pestaña del navegador
npm run dev -- --open
```

## Construcción

Para crear una versión de producción de tu aplicación:

```bash
npm run build
```

Puedes previsualizar la construcción de producción con `npm run preview`.

> Para desplegar tu aplicación, es posible que necesites instalar un [adaptador](https://svelte.dev/docs/kit/adapters) para tu entorno objetivo.

## Pruebas

Para ejecutar pruebas en tu proyecto, asegúrate de tener configurado un marco de pruebas como Jest o Mocha. Luego, puedes ejecutar las pruebas con:

```bash
npm test
```

## Despliegue

Para desplegar tu aplicación, sigue los pasos específicos para tu adaptador. Por ejemplo, si estás usando Vercel, puedes ejecutar:

```bash
vercel
```

Asegúrate de consultar la documentación del adaptador para obtener instrucciones detalladas.

## Contribuciones

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.