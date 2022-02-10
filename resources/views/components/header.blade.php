<div class="tw-w-screen tw-relative tw-min-h-[4rem]" id="header"></div> 

@push('scripts')
    {{-- <script>
        //no jq
        const header = document.getElementById('header-mobile');
        let lastScrollTop = 0;
        //hide on scroll up
        window.addEventListener('scroll', () => {
            let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
            if (st > lastScrollTop) {
                header.classList.add('tw--top-16');
            } else {
                header.classList.remove('tw--top-16');
            }
            lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        }, false);
    </script> --}}
    <script src="{{mix('js/manifest.js')}}"></script>
    <script src="{{mix('js/vendor.js')}}"></script>
    <script src="{{mix('js/header.js')}}"></script>
@endpush