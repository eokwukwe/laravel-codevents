<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laraevents</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css">
        <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAddwFzEu83xzv_3kQjwLOrK3d35bmiOKg&libraries=places">
        </script>
    </head>

    <body>
        <div id="app">
            <app></app>
        </div>

        <script src="{{ mix('js/app.js') }}" type="text/javascript"></script>
    </body>

</html>
