<div class="tw-w-screen tw-relative tw-min-h-[4rem]">

    <div class="tw-w-screen tw-shadow-md tw-flex tw-justify-between tw-py-3 tw-px-4 lg:tw-px-8 tw-top-0 tw-fixed tw-bg-white tw-transition-all tw-duration-200 tw-ease-in-out tw-items-center" id="header-mobile"{{--  style="z-index: 700" --}}>
        <span>
            <img class="tw-w-36" src="{{asset('storage/logos/logo.svg')}}" />
        </span>
        <span id="icon-drawer" class="bi bi-list tw-text-2xl"></span>
    </div>
   
</div>

@push('scripts')
    <script>
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
    </script>
@endpush