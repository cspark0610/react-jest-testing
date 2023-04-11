import React, { Component } from 'react';
import './ConfirmModalComponent.css';

interface ConmfirmModalProps {
	show: boolean;
	content: string;
	close: () => void;
}

export class ConfirmModalComponent extends Component<ConmfirmModalProps> {
	render() {
		if (!this.props.show) {
			return null;
		}
		return (
			<div className="modal">
				<div className="modalContent">
					<h2>You tried to reserve and ...</h2>
					<h3 className="modalText">{this.props.content}</h3>
					<button onClick={() => this.props.close()}>Ok, Close</button>
				</div>
			</div>
		);
	}
}
