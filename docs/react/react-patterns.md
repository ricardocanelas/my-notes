# HoC

Higher-Order Component (HOC), é apenas uma função que pega um componente existente e retorna um outro componente, envolvendo-o (wrapper) atribuindo-lhe novas funcionalidades. Ele se originou das Higher-Order Functions, que é um outro padrão de desenvolvimento.

Uma lib que complementa a utilização de HOCs é o [Recompose](https://github.com/acdlite/recompose). Como eles mesmos dizem, é como se fosse um Lodash para o React.

Example 1:

```jsx
const withLoading  = Component => {
  const WithLoading = ({ data }) =>
    data
      ? <Component data={data} />
      : <div>Loading..</div>

  WithLoading.propTypes = {
    data: PropTypes.bool
  }

  return WithLoading;
};

export default withLoading

// How use:
export default withLoading(AboutComponent)
```

Example 2:

```jsx
export const fetchAPI = (MyComponent, apiUrl) =>
  class fetchAPIHOC extends Component {
    state = {
      data: false
    }

    async componentDidMount () {
      try {
        const request = await fetch(apiUrl);
        const data = await request.json();
        this.setState({ data });
      } catch (err) {
        throw new Error(err);
      }
    }

    render () {
      return (
        <MyComponent
          data={this.state.data}
        />
      );
    }
  }

// How use:
export default fetchAPI(AboutComponent, "/aboug.json")
// or..
export default fetchAPI(withLoading(AboutComponent),  "/aboug.json");
// ....using the component
<AboutComponent data={this.state.about_data} />
```

Example 2:

```jsx
const requireAuth = Screen =>
    class extends Component {
        static displayName = `RequireAuth(${getComponentDisplayName(Screen)})`

        render() {
            return (
                <AuthContainer.Consumer>
                    {({ user}) => (
                        user ? <Screen/> : <LoginScreen />
                    )}
                </AuthContainer.Consumer>
            )
        }
    }

export default requireAuth

// How use:
export default requireAuth(PostsComponent)
```