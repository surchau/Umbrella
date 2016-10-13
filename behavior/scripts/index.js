'use strict'

exports.handle = function handle(client) {
//Add collectCity and provideWeather

const collectCity=client.createStep({
	satisfied(){
	return Boolean(client.getConversationState().weatherCity)
	},
	prompt(){
	//Need to prompt user for city
	console.log('Need to ask user for city')
	client.done()
	},
	})

const provideWeather=client.createStep({
	satisfied(){
	return false
	},
	prompt(){
	//Need to provide weather
	client.done()
	},
})



  const sayHello = client.createStep({
    satisfied() {
      return Boolean(client.getConversationState().helloSent)
    },

    prompt() {
      client.addResponse('app:response:name:welcome')
      client.addResponse('app:response:name:provide/documentation', {
        documentation_link: 'http://docs.init.ai',
      })
      client.addResponse('app:response:name:provide/instructions')
      client.updateConversationState({
        helloSent: true
      })
      client.done()
    }
  })

  const untrained = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('app:response:name:apology/untrained')
      client.done()
    }
  })

  //client.runFlow({
  //  classifications: {
			
  //  },
    
   // streams: {
    //  main: 'onboarding',
    //  onboarding: [sayHello],
     // end: [untrained]
  //  }
 // })
//Add new value to the flow
	client.runFlow({
	classification:{},
	streams:{
		main: 'getWeather',
		hi:[sayHello],
		getWeather:[collectCity,provideWeather],
	}
	})


})

}
