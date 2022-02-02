<?php 

    use App\Models\Post;

    use Carbon\Carbon;

    \Debugbar::disable(); 
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
    <div class="tw-w-full tw-px-6 md:tw-max-w-screen-sm lg:tw-max-w-screen-md tw-mx-auto tw-min-h-[calc(100vh-18rem)]">
        <h1 class="tw-text-4xl tw-mt-3 tw-font-bold tw-text-center lg:tw-mt-6 lg:tw-text-left">{{$post->title}}</h1>
        <h2 class="tw-text-xl tw-font-semibold tw-mt-1 tw-text-gray-500 tw-text-center lg:tw-text-left">{{$post->subtitle}}</h2>

        {{-- profile --}}
        <div class="tw-flex tw-w-full tw-gap-2 tw-items-center tw-mt-8">
            {{-- photo --}}
            <img class="tw-w-12 tw-h-12 tw-rounded-full tw-object-cover" src="/storage/profiles/{{$post->user->author->getPPFilename()}}">
            <div class="tw-flex tw-flex-col tw-text-sm">
                <p class="">{{$post->user->name}}</p>
                <p class="tw-text-gray-700">13 hari yang lalu <b>&middot;</b> {{$post->getReadTime()}} menit baca</p>
            </div>
        </div>
        <div class="tw-mt-4 tw-max-w-full tw-overflow-x-hidden">
            @if($post->cover_filename !== 'default.jpeg')
                <img src="{{ asset('storage/images/cover/'.$post->cover_filename) }}" alt="cover" class="tw-w-full tw-mb-8 tw-aspect-video tw-object-cover">
            @endif
            <article class="tw-prose tw-prose-neutral tw-prose-xl" style="font-family: 'PT Serif', serif;">
                {!!$post->content!!}
            </article>
        </div>
        {{-- tags --}}
        <div class="tw-flex tw-w-full tw-gap-2 tw-mt-4 tw-flex-wrap tw-text-sm">
            @foreach ($post->tags as $tag)
                <span class="tw-bg-gray-200 tw-text-gray-700 tw-rounded-md tw-p-2">
                    {{$tag}}
                </span>
            @endforeach
        </div>

        <hr class="tw-my-4 tw-border-gray-300">

        {{-- comment --}}

        {{-- author --}}
        <div class="tw-flex tw-w-full tw-gap-2 tw-items-center tw-mt-4">
            {{-- profile photo --}}
            <img class="tw-w-16 tw-h-16 tw-rounded-full tw-object-cover" src="/storage/profiles/{{$post->user->author->getPPFilename()}}">

            <div class="tw-flex tw-flex-col">
                <p class="tw-font-medium">{{$post->user->name}}</p>
                {{-- TODO: ganti dengan informasi autor --}}
                <p class="tw-text-gray-700 tw-text-sm tw-mt-2">{{$post->user->author->description}}</p> 
            </div>
        </div>
    </div>

    {{-- artikel lainnya --}}
    <section class="tw-w-full tw-px-4 md:tw-px-8 tw-mt-8">
        <?php 
            $posts = Post::where('is_public', 1)
                ->where('id', '!=', $post->id)
                ->inRandomOrder()
                ->take(6)
                ->get();
        ?>
        @if ($posts->count() > 0)
            <h3 class="tw-font-bold tw-text-xl tw-max-w-screen-lg tw-w-full tw-mx-auto">Artikel Lainnya</h3>
            <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-w-full tw-mt-2 tw-gap-4 tw-max-w-screen-lg tw-mx-auto tw-items-center tw-justify-center">
                @foreach($posts as $_post)
                    <a class="tw-w-full tw-flex tw-items-center lg:tw-w-56" href="/blog/{{ $_post->slug }}">
                        <div class="tw-flex tw-flex-col tw-flex-grow tw-gap-2">
                            <div class="tw-font-medium">{{$_post->title}}</div>
                            <div class="tw-text-gray-700 tw-text-sm">{{$_post->created_at->format('j M')}} &middot; {{$_post->getReadTime()}} menit baca</div>
                        </div>
                        <div>
                            <img class="tw-w-24 tw-h-24 tw-object-cover" src="{{ asset('storage/images/cover/'.$_post->cover_filename) }}" alt="cover">
                        </div>
                    </a>
                @endforeach
            </div>
        @endif
    </section>

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

    @include('serviceworker')
    @stack('scripts')
</body>
</html>