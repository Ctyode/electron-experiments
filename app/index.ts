import * as PIXI from 'pixi.js';
import Application = PIXI.Application;

class Main {

	public app: Application = new Application(innerWidth, innerHeight, {
		backgroundColor : 0x000000
	});

	public init(): void {
		const app: Application = this.app;
		const cursor: Cursor = new Cursor();
		const mousePosition: PIXI.Point = app.renderer.plugins.interaction.mouse.global;
		const screenWidth: number = app.screen.width;
		const screenHeight: number = app.screen.height;

		document.body.appendChild(app.view);
		cursor.init(mousePosition, screenWidth, screenHeight);
		app.ticker.add(loop);

		app.stage.addChild(cursor.getCursor());

		function resize(): void {
			app.renderer.view.style.position = 'absolute';
			app.renderer.view.style.zIndex = '0';
			app.renderer.view.style.left = ((window.innerWidth - app.renderer.width) >> 1) + 'px';
			app.renderer.view.style.top = ((window.innerHeight - app.renderer.height) >> 1) + 'px';
		}

		function loop(deltaTime: number): void {
			cursor.loop(deltaTime);
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

class Cursor {

	private cursor: PIXI.Sprite = PIXI.Sprite.fromImage('/Users/flamie/WebstormProjects/experiments/images/bunny.png');
	private mousePosition: PIXI.Point;

	public init(mousePosition: PIXI.Point, screenWidth: number, screenHeight: number): void {
		this.mousePosition = mousePosition;

		this.cursor.anchor.set(0.5);
		this.cursor.x = screenWidth / 2;
		this.cursor.y = screenHeight / 2;
	}

	public loop(deltaTime: number): void {
		console.log('zhopa');

		this.cursor.x = this.mousePosition.x;
		this.cursor.y = this.mousePosition.y;
		this.cursor.rotation += 0.1 * deltaTime;
	}

	public getCursor(): PIXI.Sprite {
		return this.cursor;
	}

}

const main: Main = new Main();
main.init();
