export default {
  routines: [
    {
      id: 0,
      name: 'Chill Time',
      slug: 'chilltime',
      iconName: 'mdi-bell-cancel',
      description: 'Sape.',
      actions: [
        {
          id: 0,
          deviceID: 1,
          actionID: 0
        },
        {
          id: 1,
          deviceID: 2,
          actionID: 1
        }
      ]
    }
  ],
  devices: [
    {
      name: 'Parlante',
      slug: 'parlante',
      image: 'parlante.png',
      id: 1,
      type: {
        id: 'c89b94e8581855bc'
      }
    },
    {
      name: 'Puerta',
      slug: 'puerta',
      image: 'puerta.png',
      id: 2,
      type: {
        id: 'lsf78ly0eqrjbz91'
      }
    },
    {
      name: 'Alarma',
      slug: 'alarma',
      image: 'alarm.png',
      id: 3,
      type: {
        id: 'mxztsyjzsrq7iaqc'
      }
    },
    {
      name: 'Persiana',
      slug: 'persiana',
      image: 'persiana.png',
      id: 4,
      type: {
        id: 'eu0v2xgprrhhg41g'
      }
    },
    {
      name: 'Aire',
      slug: 'aire',
      image: 'aire.png',
      id: 5,
      type: {
        id: 'li6cbv5sdlatti0j'
      }
    },
    {
      name: 'Heladera',
      slug: 'heladera',
      image: 'heladera.png',
      id: 6,
      type: {
        id: 'rnizejqr2di0okho'
      }
    }
  ]
}
