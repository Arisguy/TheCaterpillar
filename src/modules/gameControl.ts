import Snake from "./snake";
import Food from "./food";
import ScorePannel from "./scorePannel";

class GameControl {
  // Todo 定义三个属性
  snake: Snake; // ? 毛毛虫
  food: Food;  // ? 吃的
  scorePannel: ScorePannel;  // ? 底部
  direction: string = ''  // ? 方向变量

  snake_live: boolean = true  // ? 判断毛毛虫是否还活着
  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorePannel = new ScorePannel(10, 1)

    this.init()
  }

  // Todo 可以在这里定义游戏的初始化方法
  init() {
    // * 绑定键盘方向键事件
    document.addEventListener('keydown', this.keydownHandler.bind(this))

    this.keepMove()
  }

  // Todo 创建方向键按下的函数
  // ?? 注： this因此也指向了事件源 document  ;所以在调用keydownHandler的时候用了 bind 更改this指向
  keydownHandler(event: KeyboardEvent) {
    console.log('事件源-------------', event.key);  // ArrowUp/Up ...
    // * 对方向键的按键需要检测 仅为方向键
    this.direction = event.key
    console.warn('方向变量切换后-------------', this.direction);  // ArrowUp/Up ...
  }

  // Todo 根据 this.direction 移动毛毛虫
  // ? ArrowUp top减少
  // ? ArrowDown top增加
  // ? ArrowLeft left减少
  // ? ArrowRight left增加
  keepMove() {
    let X = this.snake.snake_X
    let Y = this.snake.snake_Y


    // * 根据方向计算 left top 值
    switch (this.direction) {
      case 'ArrowUp': case 'Up':
        Y -= 10
        break;
      case 'ArrowDown': case 'Down':
        Y += 10
        break;
      case 'ArrowLeft': case 'Left':
        X -= 10
        break;
      case 'ArrowRight': case 'Right':
        X += 10
        break;

      default:
        break;
    }


    // * 判断碰到节点处理
    this.isEatFood(X, Y)


    try {
      this.snake.snake_X = X
      this.snake.snake_Y = Y
    } catch (error) {
      alert('GAME OVER:' + error)
      this.snake_live = false
    }

    if (this.snake_live) setTimeout(this.keepMove.bind(this), 300 - (this.scorePannel.level - 1) * 30);
  }

  // Todo 检测毛毛虫是否吃到食物
  isEatFood(X: number, Y: number) {
    if (X === this.food.food_X && Y === this.food.food_Y) {
      this.food.updatedFoodPosition()
      this.scorePannel.updateScore()
      this.snake.update_shanke_length()
    }
  }
}


export default GameControl
