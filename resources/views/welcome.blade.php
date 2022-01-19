<!DOCTYPE html>
<html lang="en" className="tw-w-screen">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Selamat Datang</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('css/roboto.css') }}">
</head>
<body className="tw-max-w-full">
    <x-header />
    @include('serviceworker')
</body>
</html>