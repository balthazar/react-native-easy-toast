# react-native-easy-toast
A react native module to show toast like android, it works on iOS and Android.

## Getting started

Add `rn-toast-zavatta` to your js file.

`import Toast from 'rn-toast-zavatta'`

Inside your component's render method, use Toast:

```javascript
 render() {
         return (
             <View style={styles.container}>
                 ...
                 <Toast ref="toast"/>
             </View>
         );
 }
```

>Note: Add it in the bottom of the root view.

Then you can use it like this:

```javascript
 this.refs.toast.show('hello world!');
```

That's it, you're ready to go!

show a toast, and execute callback function when toast close it:

```javascript
    this.refs.toast.show('hello world!', 500, () => {
        // something you want to do at close
    });
```

Show a toast forever until you manually close it:
```javascript
 this.refs.toast.show('hello world!', DURATION.FOREVER);
```

Or pass an element:
```javascript
    this.refs.toast.show(<View><Text>hello world!</Text></View>);
```

 // later on:
 this.refs.toast.close('hello world!');
```

Optional you can pass a delay in seconds to the close()-method:
```javascript
 this.refs.toast.close('hello world!', 500);
```

Currently, the default delay for close() in FOREVER-mode is set to 250 ms (or this.props.defaultCloseDelay, which you can pass with)

```jsx
 <Toast ... defaultCloseDelay={100} />
```

### Basic usage

```javascript
render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    style={{padding: 10}}
                    onPress={()=>{
                        this.refs.toast.show('hello world!');
                    }}>
                    <Text>Press me</Text>
                </TouchableHighlight>
                <Toast ref="toast"/>
            </View>
        );
    }
```

### Custom Toast

```javascript
render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    style={{padding: 10}}
                    onPress={()=>{
                        this.refs.toast.show('hello world!',DURATION.LENGTH_LONG);
                    }}>
                    <Text>Press me</Text>
                </TouchableHighlight>
                <Toast
                    ref="toast"
                    style={{backgroundColor:'red'}}
                    position='top'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'red'}}
                />
            </View>
        );
    }
```

**More Usage:**

[GitHubPopular](https://github.com/crazycodeboy/GitHubPopular/blob/develop/js/page/SearchPage.js)



## API


Props              | Type     | Optional | Default     | Description
----------------- | -------- | -------- | ----------- | -----------
style  | View.propTypes.style  | true | {backgroundColor: 'black',opacity: OPACITY,borderRadius: 5,padding: 10,}  |   Custom style toast
position |  PropTypes.oneOf(['top','center','bottom',]) |true | 'bottom'  | Custom toast position
positionValue  | React.PropTypes.number  | true | 120  |   Custom toast position value
fadeInDuration  | React.PropTypes.number  | true | 500  |   Custom toast show duration
fadeOutDuration  | React.PropTypes.number  | true | 500  |   Custom toast close duration
opacity  | React.PropTypes.number  | true | 1  |   Custom toast opacity
textStyle  | View.propTypes.style  | true | {color:'white'}  |   Custom style text



Method   |  Type     | Optional | Description
----------------- | -------- | -------- | -----------
show(text, duration, callback)   | function | false | show a toast,unit is millisecond，and do callback
close()  |   function  |  -   |   start the close timer    


## Contribution

Issues are welcome. Please add a screenshot of bug and code snippet. Quickest way to solve issue is to reproduce it on one of the examples.

Pull requests are welcome. If you want to change API or making something big better to create issue and discuss it first.

---

**MIT Licensed**
