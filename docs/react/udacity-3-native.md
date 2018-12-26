*-- Date: May 2018 --*

REACT NATIVE

# Aula 1 - Conhecendo o React Native e o utilizando

 - iOS usa o Xcode
 - Android usa o Android Studio
 - Expo: iOS and Android

## Usando Expo

Usaremos o `Create React Native App` para desenvolver para iOS e para Android. Vantagens: Setup simple e rápido; sem necessidade do Xcode ou Android Studio. Desvantangens: com projetos já existentes; modulos nativos para cada sistema.

Usaremos o `Expo` que é um conjunto de ferramentas e serviços que nos permitem construir aplicativos nativos (iOS e Android) com Javascript. O Expo facilita a construçao de aplicativos móveis sem precisar escrever código nativo (por exemplo: Swhift, Objetive C, Java)

O Expo, junto ao Create React Native App, é a maneira mais rápida de começar.

Mas se quise [Construindo Projetos com Código Nativo](https://facebook.github.io/react-native/docs/getting-started.html), clique no link.


**Instalando o Create-React-Native-App:**

`npm install -g create-react-native-app` ou `yarn global add create-react-native-app`


## Opção 1 - com Expo

Instale o ExpoClient

- [ExpoClient no GoogleStore](https://play.google.com/store/apps/details?id=host.exp.exponent)
- [ExpoClient na AppleStore](https://itunes.apple.com/us/app/expo-client/id982107779)

Depois instale o ExpoCLI ou ExpoXDE

- Usando CLI, execute `expo start` ao inves de `yarn start` que vai funcionar.
- Usando ExpoXDE, crie um novo projeto ou abre um novo projeto..  que vai funcionar

## Opção 2 - com Android Studio

Vamos seguir o tutorial da [documentação](https://facebook.github.io/react-native/docs/getting-started.html#node-python2-jdk)

SETUP:

1. Install [Node.js](https://nodejs.org/en/)
2. Install [Pyhton2](https://www.python.org/downloads/)
3. Install [JSDK 8uXXX](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) (JDK 8 is the new Java 10 and 11)
4. Install [Android Studio](https://developer.android.com/studio/)
5. Install [React-Native-CLI](https://github.com/facebook/react-native) `npm install -g react-native-cli`

Quando estiver instalando, lembra-se do local de onde é instalado (Adroid SDK Installation Localtion), provavelmente em `C:\Users\MyUser\AppData\Local\Android\sdk`

Precisamos adicionar 'Environment Variables'
- JAVA_HOME: C:\Program Files\Java\jdk1.8.0_XXX
- Path: C:\Users\[MyUser]\AppData\Local\Android\sdk\platform-tools

Na primeira instalação, quando abrir o Android Studio, vai aparecer alguns alertas (na aba 'messages') para instalar pacotes ou ferramentas adicionais, faça isso. Exemplos: android-23; build tools revision 23;

Proxima coisa é criar um emulator, vá em: Tools/Android/AVD Manager ou procure por AVD Manager no menu. `Create Virtual Device..` / Nexus5 4.95 / Marshmallow API Level 23 (porque temos o android-23 e build tools) / Finish.

### Opção 3 - Instalando GenyMotion (recomendavel)

- Você precisa criar uma conta no site da GenyMotion
- Instale a versão free - [download](https://www.genymotion.com/fun-zone/)
- Crie um novo device
- Certifique que o `adb` está funcionando no terminal
- `yarn start`, depois selecione: `a`


## Debugger

**Para depurar bugs**

Tudo o que você precisa fazer é agitar seu telefone ou pressionar:

- ⌘D no simulador do iOS
- ⌘M no simulador do Android

**Para atualizar**

Para atualizar o aplicativo, apenas:

- Dê um duplo clique em "R" em seu teclado (se estiver usando o simulador)
- Agite o telefone e, em seguida, selecione "Refresh"

# Aula 2 - React vs React Native

## Web vs Native

Por exemplo, aplicativos nativos frequentemente potencializam **animações** para ajudar a criar uma ótima experiência de usuário.

Outra diferença fundamental entre aplicativos nativos e web está na **navegação**.

## Android vs iOS

Os aplicativos Android utilizam o Material Design do Google, enquanto os aplicativos iOS baseiam-se no [Human Interface Design](https://developer.apple.com/ios/human-interface-guidelines/overview/themes/), da Apple.

Ao projetar aplicativos móveis, é importante para os usuários que um aplicativo iOS realmente pareça como tal, e o mesmo vale para aplicativos Android.

A navegação entre telas também é diferente no Android e no iOS. Os dispositivos Android possuem acesso a uma barra de navegação na parte inferior da tela, o que permite que os usuários voltem à tela anterior (entre outros recursos). No iOS, a abordagem é diferente: não há tal barra de navegação universal! Ao criar a UI de um aplicativo iOS, é importante incluir um botão voltar (talvez, uma barra de navegação).

Outra diferença fundamental entre Android e iOS envolve a aba de navegação. Aplicativos iOS incluem [abas](https://developer.apple.com/ios/human-interface-guidelines/ui-bars/tab-bars/ na parte inferior da tela, permitindo acesso conveniente a diferentes partes do aplicativo. O Android também as possuem; no entanto, elas são localizadas [no topo da tela](https://material.io/design/components/tabs.html). Ambos permitem acesso a conteúdo de alto nível. Exploraremos o TabNavigator do React Native

## Componentes comuns

**VIEWS, TEXT...**

```
import { StyleSheet, View, Text } from 'react-native'
<View style={styles.container} >
</View>
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
```

**ICONS**

https://expo.github.io/vector-icons/

```
import { Ionicons } from '@expo/vector-icons'
<Ionicons name="pizza" color="red" size={100} />
```

**TOUCH/BUTTON**

```
import {
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native'

<TouchableHighlight style={styles.btn} underlayColor="#44cc33">
    <Text>Button</Text>
</TouchableHighlight>
```

**SLIDER**

```
import { Slider } from 'react-native'
<Slider
    value={0} minimumValue={-10} maximumValue={10} step={1}
    onValueChange={(val) => {}}
/>
```

**IMAGE**

```
import { Image } from 'react-native'
<Image source={require('./logo.png')} style={}>
<Image source={{uri: 'http://...'}} style={}>
```

**SROLLVIEW**

```
import { ScrollView } from 'react-native'
<ScrollView> ... </ScrollView>
```

**FLATLIST**

```
import { FlatList } from 'react-native'
<View>
    <FlatList
        data={[]}
        renderItems={(item) => <MyComponent {...item} />}
    />
</View>
```

**ACTIVITYINDICATOR**

Famoso loading...

```
import { ActivityIndicator } from 'react-native'
<ActivityIndicator />
```

**FORM**

```
import { TextInput, KeyboardAvoidingView, Slider, Switch }  from 'react-native'
```

- [onChange vs onChangeValue](https://stackoverflow.com/questions/44416541/react-native-difference-between-onchange-vs-onchangetext-of-textinput)
- [A lista completa](https://facebook.github.io/react-native/docs/components-and-apis.html#components-and-apis)

## AsyncStorage

LocalStorage é uma forma simples de persistir dados em uma aplicação web.

AsyncStorage é um sistema de armazenamento simples, sem criptografia, assíncrono, persistente e fundamental, usado em todo o aplicativo. Ele deve ser usado em vez de LocalStorage. Tem 3 metodos principais: `setItem`, `removeItem`, `clearAll`. [Outros métodos](https://facebook.github.io/react-native/docs/asyncstorage.html#methods)

A versão de localStorage no React Native é AsyncStorage. Convenientemente, como AsyncStorage é apenas uma abstração sobre os equivalentes de iOS e Android, não há nenhuma necessidade de considerar os diferentes ambientes.

```
import { AsyncStorage } from 'react-native'
const STORAGE_KEY = 'xx'

export function fetchCalendarResults () {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then(() => {
            return []
        })
}

export function submitEntry({ entry, key }) {
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [key]: entry
    }))
}

export function removeEntry (key) {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        })
}
```

# Aula 3 - Estilo e Layout

```
const style1 = {
    black: { color: 'black' }
}

import { StyleSheet } from 'react-native';
const styles2 = StyleSheet.create({
  black: { color: black }
})

<Text style={[styles.large, styles.green]}>This will be black, then large </Text>
```

StyleSheet valida o conteúdo dentro do objeto de estilo.

Além dos benefícios da qualidade do código, também existem benefícios em termos de desempenho. Fazer uma stylesheet por meio de um objeto de estilo torna possível referenciá-lo em vez de criar um novo objeto de estilo em cada render.

Media queries - Algo que você já deve ter notado é que o React Native (e especificamente a API StyleSheet) não tem suporte para media queries. Isso ocorre pois, para a maioria dos casos, você pode criar o design responsivo com flexbox que não necessitará da utilização de media queries. Nos casos raros em que o flexbox não atender às suas necessidades específicas, você pode utilizar a API Dimensions,

Recomendo usar a biblioteca [Styled-Components](https://github.com/styled-components/styled-components)


## Flexbox

O flexbox se trata de criar layouts dinâmicos. A ideia principal do flexbox é que você dará ao elemento-pai a habilidade de controlar o layout de todos os seus elementos-filhos (imediatos!) em vez de ter cada elemento-filho controlando seu próprio layout. Quando você fizer isso, o pai torna-se um **flex container**, enquanto os filhos se tornam **flex items**.

Contêineres flexbox são compostos por dois eixos (axes): o *main axis* e o *cross axis*. Algumas das propriedades mais importantes a considerar ao criar layouts com flexbox incluem flex-direction, justify-content e align-items.

- [Guia completo](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Flexbox Froggy](http://flexboxfroggy.com/)
- [Entendendo o Flexbox no React Native](https://medium.com/the-react-native-log/understanding-react-native-flexbox-layout-7a528200afd4)
- [Platform Specific Code](https://facebook.github.io/react-native/docs/platform-specific-code.html)

## Layout no React Native

Primeiro, todos os contêineres em React Native são flex containers por padrão.

```
* {
    display: flex;
}
```

A propriedade `flex-direction` por padrão na web é *row*, mas o React-Native define o padrão como *column*, o que configura os items verticalmente.

Uma outra diferença importante é como a propriedade `flex` é utilizada. Na web, flex especifica como um item flex cresce ou encolhe para gerenciar o espaço em torno dele (ao longo do eixo principal). Em React Native, flex é geralmente usado com flex itens que estão no mesmo nível, mas espera diferentes valores flex. Por exemplo:

```
const FlexDemo = props => (
  <View style={{flex: 1}}>
    <View style={{flex: 1, backgroundColor: 'red'}} />
    <View style={{flex: 2, backgroundColor: 'green'}} />
    <View style={{flex: 3, backgroundColor: 'blue'}} />
  </View>
);
```

Padrão:

```
box-sizing: border-box;
position: relative;
align-items: stretch;
flex-shrink: 0;
align-content: flex-start;
border: 0 solid black;
margin: 0;
padding: 0;
min-width: 0;
```

## API da plataforma

O React Native nos dá uma maneira conveniente de organizar o código de cada plataforma separadamente por meio da `API Platform`. Vejamos um exemplo:

```
import { Platform } from 'react-native'
Platform.OS === 'ios' ? "do something" : "another thing"
```

## API Dimensions

```
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
```

# Aula 4 - Navigation

## TabNavigation

[Doc](https://reactnavigation.org/docs/en/getting-started.html)


`yarn add react-navigation`

```
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation'

const Tabs = TabNavigator({
    Home: {
        screen: HomeComponent
        navigationOptions: {
            tabBarLabel = 'Home',
            tabBarIcon: () => <FontAwesome name='home' size={30} color='black'>
        }
    }
},
// second params
{
    navigationOptions: { header: null },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? 'black' : 'white',
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? 'white' : 'black',
            //... shadow
        }
    }
}
)

<Tabs />
```

## StatusBar

```
import { StatusBar } from 'react-native';
import { Constants } from 'expo'


function AppStatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor{backgroundColor} {...props} />
        </View>
    )
}

<AppStatusBar backgroundColor="white" barStyle="light-content" />
```

- [props de StatusBar](https://facebook.github.io/react-native/docs/statusbar.html#props)
- [TabNavigator](https://reactnavigation.org/docs/en/tab-navigator.html)

## StackNavigator

```
const Stack = StackNavigator({
    Home: {
        screen: HomeComp,
        navigationOptions: {
            title: "Home"
        }
    }
})

<TouchableOpacity onPress={() => props.navigation.navigate('Dashboard') />
```

Example completo, [aqui](https://snack.expo.io/@ricardocanelas/example---stacknavigator)

StackNavigator e TabNavigator andam muitas vezes de mãos dadas. Desde que cada um deles retorne componentes, você frequentemente verá um aninhado dentro do outro.

[Mais informações](https://medium.com/@swathylenjini/stack-navigation-in-react-native-2cd00374ff3a)

## NavigationActions

```
import { NavigationActions } from 'react-navigation'
NavigationActions.
props.navigation.dispatch(NavigationActions.back({
    key: 'Home'
}))
```

## DrawerNavigator

[Doc](https://reactnavigation.org/docs/navigators/tab)

```
const Drawer = DrawerNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            drawerLabel: 'Home',
            drawerIcon: () => <FontAwesome name='home' />
        }
    }
    Dashboard: { screen: Dashboard }
})

<TouchableOpacity onPress={() => props.navigation.navigate('DrawerOpen')}>

<Drawer />
```

# Aula 5 - Recursos Nativos

## Geolocalização / Location

Uma forma de acompanhar a velocidade, a elevação, e a direção atuais. Usando os methods **getCurrentPositionAsync()**, **watchPositionAsync**. Para ver a documentação, [clique aqui](https://docs.expo.io/versions/latest/sdk/location.html)

Ao lidar com a localização de um usuário, é importante que você considere três diferentes interfaces:

- O usuário dá permissão para exibir sua localização (esse caso é um bom exemplo).
- O usuário decide não negar e nem conceder permissão para exibir sua localização
- O usuário nega acesso à sua localização

[Exemplo](https://github.com/udacity/reactnd-UdaciFitness-complete/blob/Live-askPermission/components/Live.js)

```
import { Permissions, Location } from 'expo'

Permissions.getAsync(Permissions.LOCATION).then()...
Permissions.askAsync(Permissions.LOCATION).then()...
Location.watchPositionAsync({}, (data) => {...})
```

## Animated

- decay: initial velocity and slow to a stop
- spring: spring physics model
- timing: animated a value over time

[Documentação](https://facebook.github.io/react-native/docs/animated.html)

```
import { Animated } from 'react-native'

state = {
    opacity: new Animated.Value(0),
    width: new Animated.Value(0)
}

componentDidMount() {
    Animated.timing(this.state.opacity, { toValue: 1, duration: 1000 }).start()
    Animated.spring(this.state.width, { toValue: 300, speed: 6 }).start() // default speed is 12
}

render() {
    const { width } = this.state
    <Animated.Image source={..}
        style={[styles.image, opacity: this.state.opacity, width ]}>
}
```

## Notificações

Quando se lida com as notificações, é importante compreender que existem dois tipos diferentes: **notificações push** e **notificações locais**.

As notificações locais não utilizam ou requerem qualquer infraestrutura externa; elas acontecem inteiramente no dispositivo em si. Isso significa que a única exigência para o dispositivo exibir a notificação é que ele esteja ligado. Por outro lado, as notificações push exigem que você tenha um servidor que as levam ao dispositivo do usuário quando um determinado evento ocorre.

[Documentação oficial](https://docs.expo.io/versions/latest/sdk/location.html)

```
import { Notifications, Permission } from 'expo'

const NOTIFICATION_KEY = "my_app:notification"

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}
export function createNotification () {
    return {
        title: "Log your stats!",
        body: "Don't forget to log your stats for today!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}
export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if(data === null) {
                // --------
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status}) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()
                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(0)

                            Notifications.sheduleLocalNotificationsAsync(
                                createNotifications(),
                                {
                                    time: tomorrow,
                                    repeat: 'day'
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON_stringify(true))
                        }
                    })
                // --------
            }
        })
}

//...app.js
componentDidMount() {
    setLocalNotification()
}
```

## Manipulação de Fotos

`ImagePicker` fornece acesso à UI do sistema para selecionar imagens da biblioteca de fotos do telefone ou tirar uma foto com a câmera.

[Documentação Oficial](https://docs.expo.io/versions/latest/sdk/location.html)

```
import { ImageEditor, Image, TouchableOpacity } from 'react-native'
import { ImagePicker } from 'expo'

state = {
    image: null
}

pickImage = () => {
    ImagePicker.launchImageLibraryAsync({
        allowEditiong: true,
        aspect: [2,1]
    }).then((result) => {
        if (result.cancelled) {
            return
        }

        ImageEditor.cropImage(result.uri, {
            offset: { x: 0, y: 0},
            size: { width: result.width, height: result.height },
            displaySize: { width: 200, height: 100 },
            resizeMode: 'contain',
        }),
        (uri) => this.setState(() => ({ image: uri }))),
        () => console.log('Error')
    })
}


render() {
    const { image } = this.state
    <View>
        <TouchableOpacity onPress={this.pickImage}>
            <Text>Open Camera Roll</Text>
        </TouchableOpacity>

        {image && (
            <Image style={styles.img} source={{ uri: image }}>
        )}
    </View>
}
```

## Preparações para a App Store

Quando você envia um aplicativo a uma loja, é preciso enviar informações, não apenas o aplicativo em si. Por exemplo, você precisa de detalhes como descrição, ícone, etc. Para nossa sorte, o Expo facilita especificar esse tipo de coisa apenas editando o arquivo app.json na raiz da pasta do aplicativo. Aqui está um exemplo de configurações que acrescentaremos ao aplicativo UdaciFitness:

```
{
  "expo": {
    "sdkVersion": "19.0.0",
    "orientation": "portrait",
    "name": "Udacifitness",
    "description": "The best triathlon training app in the world.",
    "slug": "udacifitness",
    "version": "1.0",
    "icon": "https://maxcdn.icons8.com/Color/PNG/512/Sports/triathlon-512.png",
    "notification": {
      "icon": "http://www.student-scholarships.com/images/made/img/featured/nav_basketball_45_45.png"
    },
    "ios": {
     "bundleIdentifier": "org.udacifitness.exp",
    },
    "android": {
     "package": "org.udacifitness.exp",
    }
  },
}
```

[Video](https://www.youtube.com/watch?v=4rcPX-bIneE)

**O que são arquivos .apk e .ipa?**

Antes de enviar seu aplicativo a uma loja, é necessário "embalá-lo" de maneira adequada. A App Store do iOS pedirá por um . ipa ("pacote da App Store do iOS") e a Google Play Store, do Android, por um arquivo .apk* ("Android Application Package"). Ao criar um arquivo apk ou ipa, você está essencialmente criando um pacote com todas as informações de que qualquer App store precisa para processar e executar seu aplicativo.

A maneira mais fácil de gerar tanto o arquivo .apk como o .ipa é usar o CLI exp, do Expo. Primeiro, execute npm install -g exp. Após sua instalação (e a configuração do arquivo app.json), você pode executar exp build:ios para construir seu arquivo .ipa, e exp build:android para construir seu arquivo apk.

Observe que eles levarão de 10 a 20 minutos para serem construídos, então, você precisará ser paciente. Para verificar o status da buil , você pode executar exp build:status. Por fim, esse comando vai gerar uma URL onde você pode ir para baixar arquivos. ipa ou apk.

[Video](https://www.youtube.com/watch?v=IryVgEQ0SvE)

Os seguintes documentos devem ajudá-lo: para iOS, [Uploading a Build for an App](https://developer.apple.com/library/content/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/UploadingBinariesforanApp.html#//apple_%20ref/doc/uid/TP40011225-CH38-SW1) e para o Android, [Upload an App](https://support.google.com/googleplay/android-developer/answer/113469?hl=en).

Mais informações sobre fazer build, [aqui](Building Standalone Apps with Expo)

