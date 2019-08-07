import React from 'react';
import ReactLiveCycleChild from "./ReactLiveCycleChild";

class ReactLiveCycle extends React.Component {
	state = {
		backgroundColor: 'white'
	};

	constructor(props) {
		console.log('ReactLiveCycle/INIT/constructor', arguments);
		super(props);
		this.ref = React.createRef();
	}

	render() {
		console.log('ReactLiveCycle/INIT|UPDATE/render', arguments);
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
					<button
						onClick={this.onClickSetState.bind(this)}
						style={{display: 'inline-block'}}
					>Обновить состояние
					</button>
					<button
						onClick={this.onClickChangeColor.bind(this)}
						style={{display: 'inline-block'}}
					>Поменять цвет
					</button>
				</div>
				<ReactLiveCycleChild/>
			</div>
		)
	}

	/**
	 * Компонент уже в реальном DOMе.
	 * Инициализация завершена.
	 * Методы работы с DOM работают и ноды находятся, но страница в этот момент еще не показывается пользователю.
	 * Для тестирования вызываем alert.
	 */
	componentDidMount() {
		console.log('ReactLiveCycle/INIT/componentDidMount', arguments);

		const oldBackgroundColor = this.ref.current.style.backgroundColor;
		this.ref.current.style.backgroundColor = 'yellow';
		setTimeout(() => {
			this.ref.current.style.backgroundColor = oldBackgroundColor;
		}, 2000);
		// alert('ReactLiveCycle/componentDidMount/PAUSE');
	}

	onClickSetState() {
		console.log('ReactLiveCycle/onClickSetState', arguments);
		this.setState(this.state)
	}

	/**
	 * На 3000мс меняем фон.
	 * Используем setState
	 */
	onClickChangeColor() {
		console.log('ReactLiveCycle/onClickChangeColor', arguments);
		const oldBackgroundColor = this.state.backgroundColor;
		this.setState({
			backgroundColor: 'coral'
		});
		setTimeout(() => {
			this.setState({
				backgroundColor: oldBackgroundColor
			});
		}, 3000);
	}
}

export default ReactLiveCycle;