angular.module("myApp").factory "notifier",[() ->
   service = 
      error: (data) ->
         console.log "handleError, data:",data if data
         $.gritter.add
                title: 'Operation failed'
                text: 'Failed to complete the operation due to an unexpected error: ' + data
                sticky: false
                time: '6000'
                class_name: "gritterError"
      info: (title,data) ->
        $.gritter.add
                title: title
                text: data
                sticky: false
                time: '6000'
]