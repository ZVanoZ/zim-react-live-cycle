import React from 'react';
import ReactDOM from 'react-dom';
import ReactLiveCycleChild from "./ReactLiveCycleChild";

class ReactLiveCycle extends React.Component {
	state = {
		backgroundColor: 'white',
		setBackgroundColor : 'yellow'
	};
//-----------------------------------------------------------------------------
//-- Инициализация
//-----
	constructor(props) {
		console.log('ReactLiveCycle/INIT/constructor', arguments);
		super(props);
		this.ref = React.createRef();
	}

	componentWillMount() {
		console.log('ReactLiveCycle/INIT/componentWillMount', arguments);
	}

	render() {
		console.log('ReactLiveCycle/INIT|UPDATE/render', arguments);
		const buttonStyle = {
			display: 'inline-block',
			padding: '0.5rem'
		};
		return (
			<div
				ref={this.ref}
				style={{
					display: 'inline-block',
					border: '1px solid brown',
					padding: '1rem',
					margin: '1rem',
					backgroundColor: this.state.backgroundColor
				}}>
				<div>
					<h2>ReactLiveCycle</h2>
					<div key='buttons'
					     style={{
						     textAlign: 'center'
					     }}
					>
						<button onClick={this.onClickSetState.bind(this)}
						        style={buttonStyle}
						>Обновить состояние (вхолостую)
						</button>

						<button onClick={() => {
							this.changeBackgroundColorBySetState()
						}}
						        style={buttonStyle}
						>Поменять цвет - setState
						</button>

						<button onClick={() => {
							this.changeBackgroundColorByFindDOMNode()
						}}
						        style={buttonStyle}
						>Поменять цвет - FindDOMNode
						</button>

						<button onClick={() => {
							this.changeBackgroundColorByRef()
						}}
						        style={buttonStyle}
						>Поменять цвет - ReactRef
						</button>


					</div>
				</div>
				<ReactLiveCycleChild/>
			</div>
		)
	}

	/**
	 * Компонент уже в реальном DOMе.
	 * Инициализация завершена.
	 * Методы работы с DOM работают и ноды находятся, но страница в этот момент еще не показывается пользователю.
	 */
	componentDidMount() {
		console.log('ReactLiveCycle/INIT/componentDidMount', arguments);
		// При старте меняем цвет через "React ref"
		this.changeBackgroundColorByRef();
		// Для тестирования вызываем alert.
		// alert('ReactLiveCycle/componentDidMount/PAUSE');
	}

//-----------------------------------------------------------------------------
//-- Обновление
//-----
	componentWillReceiveProps(nextProps) {
		console.log('ReactLiveCycle/UPDATE/componentWillReceiveProps', arguments);
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log('ReactLiveCycle/UPDATE/shouldComponentUpdate', arguments);
		return true;
	}

	componentWillUpdate(nextProps, nextState) {
		console.log('ReactLiveCycle/UPDATE/componentWillUpdate', arguments);
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('ReactLiveCycle/UPDATE/componentDidUpdate', arguments);
	}

//-----------------------------------------------------------------------------
//-- Удаление
//-----
	componentWillUnmount() {
		console.log('ReactLiveCycle/DEAD/componentWillUnmount', arguments);
		alert('STOP/componentWillUnmount')
	}

//-----------------------------------------------------------------------------
	onClickSetState() {
		console.log('ReactLiveCycle/onClickSetState', arguments);
		this.setState(this.state)
	}

	changeBackgroundColorByRef() {
		console.log('ReactLiveCycle/changeBackgroundColorByRef', arguments);
		const oldBackgroundColor = this.ref.current.style.backgroundColor;
		this.ref.current.style.backgroundColor = this.state.setBackgroundColor;
		setTimeout(() => {
			this.ref.current.style.backgroundColor = oldBackgroundColor;
		}, 2000);
	}

	changeBackgroundColorBySetState() {
		console.log('ReactLiveCycle/changeBackgroundColorBySetState', arguments);
		const oldBackgroundColor = this.state.backgroundColor;
		this.setState({
			backgroundColor: this.state.setBackgroundColor
		});
		setTimeout(() => {
			this.setState({
				backgroundColor: oldBackgroundColor
			});
		}, 3000);
	}

	/**
	 * @deprecated
	 * @see https://ru.reactjs.org/docs/react-dom.html#finddomnode
	 */
	changeBackgroundColorByFindDOMNode() {
		console.log('ReactLiveCycle/changeBackgroundColorByFindDOMNode/@deprecated', arguments);
		const domNode = ReactDOM.findDOMNode(this);
		// console.log(domNode);
		const oldBackgroundColor = domNode.style.backgroundColor;
		domNode.style.backgroundColor = this.state.setBackgroundColor;
		setTimeout(() => {
			domNode.style.backgroundColor = oldBackgroundColor;
		}, 2000);
	}
}

export default ReactLiveCycle;