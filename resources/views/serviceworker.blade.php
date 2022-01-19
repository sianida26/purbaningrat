<script>
    if ('serviceWorker' in navigator){
        window.addEventListener('load', function(){
            navigator.serviceWorker.register('/serviceworker.js')
            .then(function(){
                //registration was successful
                console.log('service worker registration success')
            }, function(err){
                console.log('service worker registration failed')  
            })
        })
    }
</script>