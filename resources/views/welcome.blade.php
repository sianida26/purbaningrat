<?php 
    use App\Models\Post;

    $allPost = Post::where('is_public', 1)->orderBy('views', 'desc')->get();
    $highlightPost = $allPost->shift();
    $allPost = $allPost->shuffle();
    $kolom1 = $allPost->shift(3);
    $kolom2 = $allPost->shift(3);

?>
<!DOCTYPE html>
<html lang="id" className="tw-w-screen">
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

    <main class="tw-mt-8 tw-max-w-screen-sm tw-mx-auto lg:tw-max-w-full lg:tw-px-12">
        <div class="tw-w-full tw-flex tw-flex-col tw-gap-2">
            
            <div class="tw-flex tw-flex-col tw-gap-2 lg:tw-flex-row">

                {{-- highlight --}}
                <div class="tw-w-full tw-aspect-video tw-relative">
                    <div class="tw-w-full tw-h-full tw-bg-white">
                        <img src="{{ $highlightPost->getCoverUrl() }}" alt="" class="tw-w-full tw-h-full tw-object-cover">
                    </div>
                    <div class="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full">
                        <div class=" tw-flex tw-flex-col tw-pb-8 tw-justify-end tw-w-full tw-h-full tw-bg-gradient-to-t tw-from-black tw-to-transparent tw-bg-opacity-75 " style="z-index: 1;">
                            <h1 class="tw-text-white tw-text-center tw-text-xl tw-font-semibold tw-line-clamp-2">{{ $highlightPost->title }}</h1>
                        </div>
                    </div>
                </div>

                {{-- kolom 1 --}}
                <div class="tw-w-full tw-flex tw-flex-col tw-px-4 tw-gap-6 tw-mt-4 lg:tw-max-w-sm lg:tw-justify-around">
                    @foreach($kolom1 as $post)
                        <a href="/blog/{{ $post->slug }}" class="tw-flex tw-gap-2">
                            <div class="tw-flex tw-flex-grow tw-flex-col tw-justify-between">
                                <h1 class="tw-font-semibold tw-text-lg tw-line-clamp-2 tw-leading-tight">{{ $post->title }}</h1>
                                <div class="tw-flex tw-gap-2 tw-items-center">
                                    <img src="{{ $post->getAuthorPhotoUrl() }}" class="tw-w-9 tw-h-9 tw-object-cover tw-rounded-full" />
                                    <div class="tw-flex tw-flex-col tw-text-gray-700 tw-text-xs tw-justify-center">
                                        <strong>{{ $post->user->name }}</strong>
                                        <p>{{ $post->updated_at->diffForHumans() }} &middot; {{ $post->getReadTime() }} menit baca</p>
                                    </div>
                                </div>
                            </div>
                            <div class="tw-w-24 tw-flex-shrink-0 tw-flex tw-items-center">
                                <img src="{{ $post->getCoverUrl() }}" class="tw-aspect-square tw-w-24 tw-object-cover" />
                            </div>
                        </a>
                    @endforeach
                </div>
            </div>

            {{-- kolom 2 --}}
            <div class="tw-flex tw-flex-col tw-gap-6 tw-px-4 tw-mt-4 lg:tw-flex-row lg:tw-mt-8">
                @foreach($kolom2 as $post)
                    <a href="/blog/{{ $post->slug }}" class="tw-flex tw-gap-2 lg:tw-w-1/3">
                        <div class="tw-flex tw-flex-grow tw-flex-col tw-justify-between">
                            <h1 class="tw-font-semibold tw-text-lg tw-line-clamp-2 tw-leading-tight">{{ $post->title }}</h1>
                            <div class="tw-flex tw-gap-2 tw-items-center">
                                <img src="{{ $post->getAuthorPhotoUrl() }}" class="tw-w-9 tw-h-9 tw-object-cover tw-rounded-full" />
                                <div class="tw-flex tw-flex-col tw-text-gray-700 tw-text-xs tw-justify-center">
                                    <strong>{{ $post->user->name }}</strong>
                                    <p>{{ $post->updated_at->diffForHumans() }} &middot; {{ $post->getReadTime() }} menit baca</p>
                                </div>
                            </div>
                        </div>
                        <div class="tw-w-24 tw-flex-shrink-0 tw-flex tw-items-center">
                            <img src="{{ $post->getCoverUrl() }}" class="tw-aspect-square tw-w-24 tw-object-cover" />
                        </div>
                    </a>
                @endforeach
            </div>

        </div>
    </main>
    {{-- @include('serviceworker') --}}
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

    @stack('scripts')
</body>
</html>