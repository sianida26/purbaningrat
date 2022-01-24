<!DOCTYPE html>
<html lang="en" className="tw-w-screen">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Selamat Datang</title>
    @include('css/bootstrap-icons')
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('css/roboto.css') }}">
</head>
<body className="tw-max-w-full tw-overflow-x-hidden tw-bg-gray-100">
    <x-header />
    {{-- @include('serviceworker') --}}

    @stack('scripts')
</body>
</html>