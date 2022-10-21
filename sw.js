var nombreCache='uno';

self.addEventListener(
    'install',
    function(event){
        // esperar hasta que la promesa que recibe como argumento sea concluida
        event.waitUntil(
            caches.open(nombreCache)
            .then(
                function(cache){
                    cache.addAll(
                        [
                            'manifiesto.json',
                            'script.js',
                            'descarga.png',
                            'index.html'
                        ]
                    );        
                }
            )
        );    
    }
);

self.addEventListener(
    'fetch', 
    function(event) {
        event.respondWith( 
            caches.match(event.request)
            .then(
                function(respuesta){
                    if(respuesta){
                        console.log('entró');
                        return respuesta;
                    }   
                    else{
                        return fetch(event.request);
                    }  
                }
            ) 
        );
    }
);