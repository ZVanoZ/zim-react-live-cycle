import React from 'react';

class ReactLiveCycleChild extends React.Component {
	state = {
		buttonTitle: 'Отладочная информация в консоли браузера.',
		cntClick: 0
	};
//-----------------------------------------------------------------------------
//-- Инициализация
//-----
	constructor(props) {
		super(props);
		console.log('ReactLiveCycleChild/INIT/constructor', arguments);
		this.ref = React.createRef();
	}

	/**
	 * Для получения данных.
	 * Например AJAX для извлечения данных из БД.
	 */
	componentWillMount() {
		console.log('ReactLiveCycleChild/INIT/componentWillMount', arguments);
	}

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		console.log('ReactLiveCycleChild/INIT|UPDATE/render', arguments);
		// alert('ReactLiveCycleChild/render/PAUSE');
		return (
			<div ref={this.ref}
			     style={{
				     display: 'inline-block',
				     border: '1px solid brown',
				     padding: '1rem',
				     margin: '1rem',
				     backgroundColor: 'coral'
			     }}>
				<h2>ReactLiveCycleChild</h2>

				<button onClick={this.onCounterClick.bind(this)} title={this.state.buttonTitle}
				>Нажми на меня!
				</button>

				<div>Нажали раз: {this.state.cntClick}</div>
			</div>
		)
	}

	/**
	 * Компонент уже в реальном DOMе.
	 * Инициализация завершена.
	 * Методы работы с DOM работают и ноды находятся, но страница в этот момент еще не показывается пользователю.
	 */
	componentDidMount() {
		console.log('ReactLiveCycleChild/INIT/componentDidMount', arguments);
		this.defaultColor = this.ref.current.style.backgroundColor;
	}

//-----------------------------------------------------------------------------
//-- Обновление
//-----
	componentWillReceiveProps(nextProps) {
		console.log('ReactLiveCycleChild/UPDATE/componentWillReceiveProps', arguments);
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log('ReactLiveCycleChild/UPDATE/shouldComponentUpdate', arguments);
		return true;
	}

	componentWillUpdate(nextProps, nextState) {
		console.log('ReactLiveCycleChild/UPDATE/componentWillUpdate', arguments);
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('ReactLiveCycleChild/UPDATE/componentDidUpdate', arguments);
	}

//-----------------------------------------------------------------------------
//-- Удаление
//-----
	componentWillUnmount() {
		console.log('ReactLiveCycleChild/DEAD/componentWillUnmount', arguments);
		alert('STOP/componentWillUnmount')
	}

//-----------------------------------------------------------------------------
	onCounterClick() {
		console.log('ReactLiveCycleChild/onCounterClick', arguments);
		this.setState({
			cntClick: this.state.cntClick + 1
		});
		this.changeBackgroundColorByRef()
	}

	changeBackgroundColorByRef() {
		console.log('ReactLiveCycle/changeBackgroundColorByRef', arguments);
		this.ref.current.style.backgroundColor = 'yellow';
		setTimeout(() => {
			this.ref.current.style.backgroundColor = this.defaultColor;
		}, 500);
	}
}

export default ReactLiveCycleChild;