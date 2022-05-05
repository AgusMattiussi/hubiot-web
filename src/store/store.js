export default {
  devices: [
    {
      name: 'Parlante',
      slug: 'parlante',
      image: 'parlante.jpg',
      id: 1,
      description:
        'parlantoide',
      actions: [
        {
          name: 'Subir volumen',
          slug: 'subir-volumen',
          image: 'subir-volumen.jpg',
          description:
            'Permite incrementar (+1) el volumen del parlante. No recibe parámetros.'
        },
        {
          name: 'Bajar volumen',
          slug: 'bajar-volumen',
          image: 'bajar-volumen.jpg',
          description:
            'Permite decrementar (-1) el volumen del parlante. No recibe parámetros.'
        },
        {
          name: 'Establecer volumen',
          slug: 'establecer-volumen',
          image: 'establecen-volumen.jpg',
          description:
            'Permite establecer el volumen del parlante. Recibe el nivel (valor entre 0 y 10) como parámetro.'
        },
        {
          name: 'Reproducir',
          slug: 'reproducir',
          image: 'reproducir.jpg',
          description:
            'Permite reproducir la música. No recibe parámetros.'
        },
        {
          name: 'Detener',
          slug: 'detener',
          image: 'detener.jpg',
          description:
            'Permite detener la música. No recibe parámetros.'
        },
        {
          name: 'Pausar',
          slug: 'pausar',
          image: 'pausar.jpg',
          description:
            'Permite pausar la música. No recibe parámetros.'
        },
        {
          name: 'Siguiente Canción',
          slug: 'siguiente',
          image: 'siguiente.jpg',
          description:
            'Permite reproducir la siguiente canción. No recibe parámetros.'
        },
        {
          name: 'Anterior Canción',
          slug: 'anterior',
          image: 'anterior.jpg',
          description:
            'Permite reproducir la anterior canción. No recibe parámetros.'
        },
        {
          name: 'Cambiar Género',
          slug: 'cambiar-genero',
          image: 'cambiar-genero.jpg',
          description:
            'Permite cambiar el género de la música. Recibe el género (valores posibles: clasica, country, dance, latina, pop, rock, etc.) como parámetro.'
        },
        {
          name: 'Obtener Lista Reproducción ',
          slug: 'obtener-lista',
          image: 'obtener-lista.jpg',
          description:
            'Permite obtener la lista de canciones y su duración para el género de la música.'
        },
        {
          name: 'Obtener Estado ',
          slug: 'obtener-estado',
          image: 'obtener-estado.jpg',
          description:
            'Permite obtener el estado del parlante (volumen, género de música, canción que se está reproduciendo y marca de tiempo de la misma). No recibe parámetros'
        }
      ]
    },
    {
      name: 'Puerta',
      slug: 'puerta',
      image: 'puerta.jpg',
      id: 2,
      description:
        'puertoide',
      actions: [
        {
          name: 'Abrir',
          slug: 'abrir',
          image: 'abrir.jpg',
          description:
            'Permite abrir la puerta. No recibe parámetros'
        },
        {
          name: 'Cerrar',
          slug: 'cerrar',
          image: 'cerrar.jpg',
          description:
            'Permite cerrar la puerta. No recibe parámetros'
        },
        {
          name: 'Bloquear',
          slug: 'bloquear',
          image: 'bloquear.jpg',
          description:
            'Permite bloquear (mayor seguridad que la acción de cierre) la puerta. No recibe parámetros.'
        },
        {
          name: 'Desbloquear',
          slug: 'desbloquear',
          image: 'desbloquear.jpg',
          description:
            'Permite desbloquear la puerta. No recibe parámetros.'
        },
        {
          name: 'Obtener Estado',
          slug: 'obtener-estado',
          image: 'obtener-estado.jpg',
          description:
            'Permite obtener el estado de la puerta a (abierta / cerrada y bloqueada / desbloqueada). No recibe parámetros.'
        }
      ]
    },
    {
      name: 'Aire acondicionado',
      slug: 'aire-acondicionado',
      image: 'aire.jpg',
      id: 3,
      description:
        'aire acondionadoide',
      actions: [
        {
          name: 'Encender',
          slug: 'encender',
          image: 'encender.jpg',
          description:
            'Permite encender el aire acondicionado. No recibe parámetros.'
        },
        {
          name: 'Apagar',
          slug: 'apagar',
          image: 'apagar.jpg',
          description:
            'Permite apagar el aire acondicionado. No recibe parámetros.'
        },
        {
          name: 'Establecer Temperatura',
          slug: 'temperatura',
          image: 'temperatura.jpg',
          description:
            'Permite establecer la temperatura del aire acondicionado. Recibe la temperatura (valor entre 18 y 38 [grados centígrados]) como parámetro. '
        },
        {
          name: 'Establecer Modo',
          slug: 'modo',
          image: 'modo.jpg',
          description:
            'Permite establecer el modo del aire acondicionado. Recibe el modo (valores posibles: ventilación, frío o calor) como parámetro.'
        },
        {
          name: 'Establecer Desplazamiento Aspas Verticales',
          slug: 'aspasv',
          image: 'aspasv.jpg',
          description:
            'Permite establecer el modo de desplazamiento de las aspas verticales del aire acondicionado. Recibe el modo de desplazamiento (valores posibles: automático, 22, 45, 67 o 90 [grados]) como parámetro'
        },
        {
          name: 'Establecer Desplazamiento Aspas Horizontales',
          slug: 'aspash',
          image: 'aspash.jpg',
          description:
            'Permite establecer el modo de desplazamiento de las aspas horizontales del aire acondicionado. Recibe el modo de desplazamiento (valores posibles: automático, -90, -45, 0, 45 o 90 [grados]) como parámetro.'
        },
        {
          name: 'Establecer Velocidad Ventilador',
          slug: 'velocidad',
          image: 'velocidad.jpg',
          description:
            'Permite establecer la velocidad del ventilador del aire acondicionado. Recibe la velocidad del ventilador (valores posibles: automático, 25, 50, 75 o 100 [porcentaje]) como parámetro'
        },
        {
          name: 'Obtener Estado',
          slug: 'obtener-estado',
          image: 'obtener-estado.jpg',
          description:
            'Permite obtener el estado del aire acondicionado (encendido / apagado, temperatura, modo, desplazamiento de aspas verticales, desplazamiento de aspas horizontales y velocidad del ventilador. No recibe parámetros'
        }
      ]
    }
  ]
}
