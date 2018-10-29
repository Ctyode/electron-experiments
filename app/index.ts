import * as PIXI from 'pixi.js';
import Application = PIXI.Application;

class Main {

	public init(): void {

		const app: Application = new Application(innerWidth, innerHeight, {
			backgroundColor : 0x000000
		});
		const mousePosition: PIXI.Point = app.renderer.plugins.interaction.mouse.global;
		const cursor: PIXI.Sprite = PIXI.Sprite.fromImage('/Users/flamie/WebstormProjects/experiments/images/bunny.png');

		document.body.appendChild(app.view);
		app.ticker.add(loop);

		app.stage.addChild(cursor);

		cursor.anchor.set(0.5);
		cursor.x = app.screen.width / 2;
		cursor.y = app.screen.height / 2;

		function resize(): void {
			app.renderer.view.style.position = 'absolute';
			app.renderer.view.style.zIndex = '0';
			app.renderer.view.style.left = ((window.innerWidth - app.renderer.width) >> 1) + 'px';
			app.renderer.view.style.top = ((window.innerHeight - app.renderer.height) >> 1) + 'px';
		}

		function loop(deltaTime: number): void {
			cursor.x = mousePosition.x;
			cursor.y = mousePosition.y;
			cursor.rotation += 0.1 * deltaTime;
		}

		function setColor(): void {
			console.log('click');
			const rgb: string = document.getElementById('btnColor').style.backgroundColor;
			console.log(rgb);
			const hex: string = '#' + rgb.substr(4, rgb.indexOf(')') - 4).split(', ').map((color: string) => color === '0' ? '00' : parseInt(color).toString(16) ).join('');
			console.log(hex);
			const hexToNumber: number = parseInt(hex.replace(/^#/, ''), 16);
			console.log(hexToNumber);
			app.renderer.backgroundColor = hexToNumber;
		}

		document.querySelector('#btnColor').addEventListener('click', setColor);
		resize();
		window.addEventListener('resize', resize);

	}

}

const main: Main = new Main();
main.init();
