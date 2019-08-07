import React from 'react';

class ReactLiveCycleChild extends React.Component {
	state = {
		buttonTitle: 'Отладочная информация в консоли браузера.',
		cntClick: 0,
		defaultBackgroundColor : 'white',
		backgroundColor : 'white'
	};
//-----------------------------------------------------------------------------
//-- Инициализация
//-----
	constructor(props) {
		super(props);
		console.log('ReactLiveCycleChild/INIT/constructor', arguments);
	}

	/**
	 * Для аолучения данных.
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
			<div style={{
				display: 'inline-block',
				border: '1px solid brown',
				padding: '1rem',
				margin: '1rem',
				backgroundColor : this.state.backgroundColor
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
	 */
	componentDidMount() {
		console.log('ReactLiveCycleChild/INIT/componentDidMount', arguments);
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
			cntClick: this.state.cntClick + 1,
			backgroundColor: 'coral'
		});
		setTimeout(() => {
			this.setState({
				backgroundColor: this.state.defaultBackgroundColor
			});
		}, 500);
	}

}

export default ReactLiveCycleChild;