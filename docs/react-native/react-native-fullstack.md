REACT NATIVE

**Expo** https://snack.expo.io/

**Watchman** is a file watching service that watches files and triggers actions when they are modified.
If you use macOS as your operating system, the Expo and React Native documentation recommend
installing Watchman for better performance.

# Tips

## 7 step process

This follows from a handy process for developing a React Native app from scratch:

1. Break the app into components
2. Build a static version of the app
3. Determine what should be stateful
4. Determine in which component each piece of state should live
5. Hardcode initial states
6. Add inverse data flow
7. Add server communication (if present)

## Top-down vs Bottom-up

When it comes to building the UI components of an app, there are generally two approaches: topdown and bottom-up. Choosing between these two approaches is mostly personal preference, and it’s common to do a little of both.


## Tools

- [30s of code](https://github.com/30-seconds/30-seconds-of-code)
- [Libreact](https://github.com/streamich/libreact)

- [Flex-CheatSheet](https://yoksel.github.io/flex-cheatsheet/)
- [RN-Flex-CheatSheet](https://medium.com/@drorbiran/the-full-react-native-layout-cheat-sheet-a4147802405c)
- [Yoga](https://yogalayout.com/)

---

# Packages

- [uuid - Universally Unique IDentifier53]('https://www.npmjs.com/package/uuid');
- [Best Lbraries](https://rubygarage.org/blog/react-native-best-libraries)

---

# Utils

## Images

```
const images = {
  Clear: require('../assets/clear.png'),
  Hail: require('../assets/hail.png'),
  'Heavy Cloud': require('../assets/heavy-cloud.png'),
};

export default weather => images[weather];
```

```
import 'images' from 'Images'
images('Clear')
```

## Fetch

```
getLocation = async (city) => {
    if(!city) return;

    this.setState({ loading: true }, async () => {
        try {
            const locationId = await fetchLocationId(city);
            this.setState({
                loading: false,
                error: false,
            })
        } catch (e) {
            this.setState({
                loading: false,
                error: true,
            })
        }
    })
}
```

## Constants

```
import { Constants } from 'expo';
Constants.statusBarHeight,
```

---

# Components

## View


- *First*, we use View for layout. A View is commonly used as a container for other components. If
we want to arrange a group of components vertically or horizontally, we will likely wrap those
components in a View.

- *Second*, we use View for styling our app. If we want to render a simple shape like a circle or
rectangle, or if we want to render a border, a line, or a background color, we will likely use a
View.

## StyleSheet

```
import { StyleSheet, View, Text } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32px
    }
})

<View style={styles.container}>
    <Text style={styles.title}>Title</Text>
</View>
```

## TextInput

[Doc](https://facebook.github.io/react-native/docs/textinput.html)

```js
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';

static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};

handleChangeText = text => {
    this.setState({ text });
};

handleSubmitEditing = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;

    if (!text) return;

    onSubmit(text);
    this.setState({ text: '' });
};

<TextInput
    autoCorrect={false}
    placeholder="Search any city"
    placeholderTextColor="white"
    clearButtonMode="always"
    underlineColorAndroid="transparent"
    onChangeText={this.handleChangeText}
    onSubmitEditing={this.handleSubmitEditing}
/>
<TextInput
    autoCapitalize="sentences"
    keyboardType="numeric"
    multiline={true}
    returnKeyType="done"
/>
```

## Image

```js
import { Image } from 'react-native'
<Image source={{ uri: 'https://unsplash.it/600/600' }} />
```

## ImageBackground

```js
import { ImageBackground } from 'react-native'

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
})

<ImageBackground
    source={images('MyImageInRequire')}
    style={styles.imageContainer}
    imageStyle={styles.image}>
    ...
</ImageBackground>
```

## Platform

```
import { Platform } from 'react-native';
Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto'
```

```
import { Constacts } from 'expo';
const marginTop = Platform.OS === 'ios' && platformVersion < 11
                  ? Constants.statusBarHeight
                  : 0
```

```
const styled = Platform.select({
    'ios': {
        fontFamily: 'AvenirNext-Regular'
    },
    'android': {
        fontFamily: 'Robot'
    }
});
```

## KeyboardAvoidingView

```
import { KeyboardAvoidingView } from 'react-native';
<KeyboardAvoidingView behavior="padding">
    ...
</KeyboardAvoidingView>
```

## ActivityIndicator

ActivityIndicator is a built-in component that displays a circular loading spinner. We’ll use it when data is being fetched from the network

```
import { ActivityIndicator } from 'react-native'
const loading = true;
<ActivityIndicator animating={loading} color="white" size="large" />
```

## StatusBar

StatusBar is a built-in component that allows us to modify the app status bar at the top of the device

```
import { StatusBar } from 'react-native'
<StatusBar barStyle="light-content" />
```

## ScrollView

```js
import { ScrollView, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timerList: {
    paddingBottom: 15,
  },
});

<View style={{flex:1}}>
    <View style={styles.titleContainer}>
        <Text style={styles.title}>Title</Text>
    </View>
    <ScrollView style={styles.timerList}>
    </ScrollView>
</View>
```

## ColorPropType

```
import { ColorPropType } from 'react-native';
import PropTypes from 'prop-types';

Avatar.propTypes = {
    initials: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    backgroundColor: ColorPropType.isRequired,
};
```


## PropTypes

```
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types';

static propTypes = {
    style: ViewPropTypes.style,
};

static defaultProps = {
    style: null,
};
```


## TouchableOpacity

The TouchableOpacity component is similar to View. The TouchableOpacity component fades out when pressed, and fades back in when released. The opacity animation happens on the native side (it doesn’t trigger a re-render), so the animation is extremely smooth and the interaction is low latency. The opacity value when pressed can be configured with the *activeOpacity* prop by providing a number from 0 to 1.

If you don’t like the opacity animation, you can instead use a TouchableHighlight for a background color changing animation.

One minor inconvenience with both TouchableOpacity and TouchableHighlight: these components can only have a single child element, so if we want multiple children, we will need to wrap them in a *View*.

## FlatList

FlatList components are used for rendering large quantities of scrollable content. Instead of rendering a children prop, the FlatList renders each item in an input data array using the *renderItem* prop.

The FlatList is built using a more generic component, the ScrollView, which we’ll use later in the chapter.

```
import { FlatList } from 'react-native';

const keyExtractor = ({ id }) => id.toString();

renderItem = ({ item: { id, author } }) => (
    <Card
      fullname={author}
      image={{
        uri: getImageFromId(id),
      }}
    />
);

<FlatList
    data={items}
    renderItem={this.renderItem}
    keyExtractor={keyExtractor}
/>
```

## Modal

```
<Modal
    visible={showModal}
    animationType="slide"
    onRequestClose={this.closeCommentScreen}
    >
    <Comments
        style={styles.comments}
        comments={commentsForItem[selectedItemId] || []}
        onClose={this.closeCommentScreen}
        onSubmitComment={this.onSubmitComment}
    />
</Modal>
```

---

# Imperative APIs.

## Async Storage

```js
const ASYNC_STORAGE_COMMENTS_KEY = 'ASYNC_STORAGE_COMMENTS_KEY';
import { AsyncStorage } from 'react-native';

async componentDidMount() {
    try {
        const commentsForItem = await AsyncStorage.getItem(
            ASYNC_STORAGE_COMMENTS_KEY,
        );
        this.setState({
            commentsForItem: commentsForItem ? JSON.parse(commentsForItem) : {},
        });
    } catch (e) {
        console.log('Failed to load comments');
    }
}

save(data) {
    try {
        AsyncStorage.setItem(ASYNC_STORAGE_COMMENTS_KEY, JSON.stringify(data));
    } catch (e) {
        console.log('Failed to save comment');
    }
}
```

## NetInfo

```js
import { NetInfo, Platform } from 'react-native'

state = {
    connectionType: null,
};

async componentWillMount() {
    this.subscription = NetInfo.addEventListener(
      'connectionChange',
      this.handleChange,
    );

    const { type } = await NetInfo.getConnectionInfo();

    this.setState({ connectionType: type });

    // We can use this to test changes in network connectivity
    // setTimeout(() => this.handleChange('none'), 3000);
    // handleChange = connectionType => {
    //   this.setState({ connectionType });
    // };
}

componentWillUnmount() {
    this.subscription.remove();
}

render() {
    const { connectionType } = this.state;
    const isConnected = connectionType !== 'none';
    const backgroundColor = isConnected ? 'white' : 'red';

    const statusBar = (
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={isConnected ? 'dark-content' : 'light-content'}
        animated={false}
      />
    );

    const messageContainer = (
      <View style={styles.messageContainer} pointerEvents={'none'}>
        {statusBar}
        {!isConnected && (
          <View style={styles.bubble}>
            <Text style={styles.text}>No network connection</Text>
          </View>
        )}
      </View>
    );

    if (Platform.OS === 'ios') {
      return (
        <View style={[styles.status, { backgroundColor }]}>
          {messageContainer}
        </View>
      );
    }

    return messageContainer;
}

const statusHeight = Platform.OS === 'ios' ? Constants.statusBarHeight : 0;

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight,
  },
  messageContainer: {
    zIndex: 1,
    position: 'absolute',
    top: statusHeight + 20,
    right: 0,
    left: 0,
    height: 80,
    alignItems: 'center',
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
  },
});
```

## MapView

If you’re running an Android emulator, you’ll need the Google Play Services installed to actually see a MapView (otherwise you’ll see a placeholder label). You can create an emulator from Android Studio with this, but it can be difficult to connect it to Expo. If you don’t know how to do this already, we recommend testing on a real Android device if possible.

```js
import { MapView } from 'expo';
// or import MapView from 'react-native-maps'

<MapView
    style={styles.map}
    initialRegion={{
        ...coordinate,
        latitudeDelta: 0.08,
        longitudeDelta: 0.04,
    }}
>
    <MapView.Marker coordinate={coordinate} />
</MapView>

```

## Alert

```js
import { Alert } from 'react-native'

Alert.alert(
    'Delete message?',
    'Are you sure you want to permanently delete this message?',
    [
        {
            text: 'Cancel',
            style: 'cancel',
        },
        {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
                const { messages } = this.state;
                this.setState({
                    messages: messages.filter(message => message.id !== id),
                });
            },
        },
    ],
);
```

## FullScreen

```js
const styles = StyleSheet.create({
// ...
    fullscreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 2,
  },
  fullscreenImage: {
    flex: 1,
    resizeMode: 'contain',
  },
});

<TouchableHighlight style={styles.fullscreenOverlay} onPress={this.dismissFullscreenImage}>
    <Image style={styles.fullscreenImage} source={{ uri }} />
</TouchableHighlight>
```

## BackHandler (Android)

```js
import { BackHandler } from 'react-native';

this.subscription = BackHandler.addEventListener(
    'hardwareBackPress',
    () => {
        const { fullscreenImageId } = this.state;

        if (fullscreenImageId) {
            this.dismissFullscreenImage();
            return true;
        }

        return false;
    },
);
```

## Geolocalization

[Doc](https://developer.mozilla.org/pt-BR/docs/Web/API/Navigator/geolocation)

If you’re building an app using react-native-cli, you’ll also need to modify your *Info.plist* on iOS and *AndroidManifest.xml* on Android to enable location permissions.

```js
navigator.geolocation.getCurrentPosition(position => {
      const { coords: { latitude, longitude } } = position;

      this.setState({
        messages: [
          createLocationMessage({
            latitude,
            longitude,
          }),
          ...messages,
        ],
      });
});

// or..

navigator.geolocation.watchPosition(this.handleChange, this.handleError);
navigator.geolocation.getCurrentPosition(this.handleChange, this.handleError);

handleChange = location => {
    this.setState({
      coords: location.coords,
      error: null,
    });
};
handleError = error => {
    this.setState({ error });
};
```

## Dimensions

```js
import { Dimensions } from 'react-native'
const { width } = Dimensions.get('window');
```

Maybe you need use 'PixelRatio.roundToNearestPixel'

Because there may be multiple physical pixels per logical pixels in a device with a high pixel density, e.g. retina display

```js
import { PixelRatio } from 'react-native'

renderGrid = (info) {
    const { index } = info;
    const { renderItem, numColumns, itemMargin } = this.props;

    // We want to get the device width on render, in case the device is rotated
    const { width } = Dimensions.get('window');

    // Fix visual inconsistencies by aligning to the nearest pixel
    const size = PixelRatio.roundToNearestPixel(
            (width - itemMargin * (numColumns - 1)) / numColumns,
    );

    // We don't want to include a `marginLeft` on the first item of a row
    const marginLeft = index % numColumns === 0 ? 0 : itemMargin;

    // We don't want to include a `marginTop` on the first row of the grid
    const marginTop = index < numColumns ? 0 : itemMargin;

    renderItem({...info, size, marginLeft, marginTop})
}
```

## Camera

```js

// Ask a permission
const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

if (status !== 'granted') {
    console.log('Camera roll permission denied');
    return;
}
const results = await CameraRoll.getPhotos({
    first: 20,
});

const { edges } = results;
const loadedImages = edges.map(item => item.node.image);
this.setState({ images: loadedImages });
```

```js
// eslint-disable-next-line react/sort-comp
loading = false;
cursor = null;

state = {
    images: [],
};

componentDidMount() {
    this.getImages();
}

getImages = async after => {
    if (this.loading) return;

    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status !== 'granted') {
      console.log('Camera roll permission denied');
      return;
    }

    this.loading = true;

    const results = await CameraRoll.getPhotos({
      first: 20,
      after,
    });

    const { edges, page_info: { has_next_page, end_cursor } } = results;

    const loadedImages = edges.map(item => item.node.image);

    this.setState({ images: this.state.images.concat(loadedImages) }, () => {
        this.loading = false;
        this.cursor = has_next_page ? end_cursor : null;
      }
    );
};


getNextImages = () => {
    // Prevent loading the initial page after we've reached the end
    if (!this.cursor) return;
    this.getImages(this.cursor);
};

<FlatList onEndReached={this.getNextImages} />

```