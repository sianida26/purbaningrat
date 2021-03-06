<?php 
    use App\Models\Category;

    use Carbon\Carbon;

    use Illuminate\Support\Str;

    // use Debugbar;

    // \Debugbar::disable(); 

    $categoryModel = Category::firstWhere('name', $category);

    $posts = $categoryModel === null ? collect([]) : $categoryModel->posts()->where('is_public',true)->get()->sortBy('views');

    Debugbar::info($posts);

?>
<!DOCTYPE html>
<html lang="en" class="tw-w-screen">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    @include('css/bootstrap-icons')
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('css/roboto.css') }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
</head>
<body class="tw-w-screen tw-overflow-x-hidden tw-min-h-screen tw-relative">
    <x-header />
    <div class="tw-w-full tw-px-6 md:tw-max-w-screen-sm lg:tw-max-w-screen-lg tw-mx-auto tw-min-h-[calc(100vh-18rem)]">
        <h1 class="tw-text-4xl tw-mt-3 tw-font-bold tw-text-center lg:tw-mt-6 lg:tw-text-left">{{ Str::headline($category) }}</h1>

        @if ($posts->isEmpty())
            <p class="tw-text-lg tw-mt-6">- Tidak ada post -</p>
        @else
            <div class="tw-flex tw-flex-col tw-gap-8 tw-divide-x tw-mt-8 md:tw-grid md:tw-grid-cols-3 md:tw-gap-y-16">
                
                @foreach($posts as $post)
                    <a href="/blog/{{ $post->slug }}" class="tw-flex tw-flex-col tw-gap-2 tw-w-full">
                        {{-- cover --}}
                        <img class="tw-w-full tw-h-40 tw-object-cover" src="{{ asset('storage/images/cover/' . $post->cover_filename) }}" >

                        <h1 class="tw-text-xl tw-font-bold tw-line-clamp-3 {{-- md:tw-min-h-[3.75rem] --}}">{{ $post->title }}</h1>
                        <div class="{{-- md:tw-min-h-[7.875rem] --}}"> {{-- calc(4*1.125rem*1.75rem) (number of lines) * (font-size) * (line-height multiplier) --}}
                            <p class="tw-line-clamp-4 tw-text-lg tw-text-gray-600">
                                {!! $post->subtitle ? $post->subtitle : Str::words($post->content, 20) !!}
                            </p>
                        </div>

                        <div class="tw-w-full tw-flex tw-gap-2">
                            <img src="{{ asset('storage/profiles/' . $post->user->author->getPPFilename()) }}" class="tw-w-8 tw-h-8 tw-object-cover tw-rounded-full" alt="">
                            <div class="tw-flex tw-flex-col">
                                <p class="tw-text-gray-600 tw-text-sm">{{ $post->user->name }}</p>
                                <p class="tw-text-gray-600 tw-text-sm">{{ $post->created_at->diffForHumans() }}</p>
                            </div>
                        </div>
                    </a>
                @endforeach
            </div>
        @endif
    </div>

    <footer class="tw-w-full tw-bg-zinc-900 tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-56 tw-px-4 tw-mt-8">
        
        <div class="tw-flex tw-gap-2 tw-text-lg">
            <a class="bi bi-youtube tw-text-[#ff0a00]" href="#"></a>
            <a class="bi bi-facebook tw-text-[#3b5998]" href="#"></a>
            <a class="bi bi-twitter tw-text-[#00aced]" href="#"></a>
            <a class="bi bi-instagram tw-text-[#e1306c]" href="#"></a>
        </div>

        <hr class="tw-w-36 tw-border-dashed tw-border-gray-500 tw-my-4">
        
        <img src="{{ asset('storage/logos/logo-white.png') }}" alt="logo" class="tw-w-48 tw-object-cover">
    </footer>

    {{-- @include('serviceworker') --}}
    @stack('scripts')
</body>
</html>