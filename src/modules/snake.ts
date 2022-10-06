class Snake {
  snakeElement: HTMLElement
  snakeHead: HTMLElement
  snakeBodies: HTMLCollection;  //html集合
  constructor() {
    this.snakeElement = document.getElementById('snake')!
    this.snakeHead = document.querySelector("#snake>div") as HTMLElement // 断言 获取为元素
    this.snakeBodies = document.getElementById('snake')!.getElementsByTagName('div') // 获取蛇的身体
  }

  // Todo 获取毛毛虫脑壳的坐标
  get snake_X() {
    return this.snakeHead.offsetLeft
  }
  get snake_Y() {
    return this.snakeHead.offsetTop
  }

  // Todo 更新毛毛虫的坐标
  set snake_X(val: number) {
    if (this.snake_X === val) return

    // * 坐标的更新必须在范围内
    if (val < 0 || val > 290) { // 毛毛虫完犊子 跑出异常
      throw new Error("毛毛虫撞墙了！！！");
    }

    // * 毛毛虫在向左移动的时候不能向右；反之亦然
    if (this.snakeBodies[1] && (this.snakeBodies[1] as HTMLElement).offsetLeft === val) {
      // * 水平方向发生了掉头！！！
      if (val > this.snake_X) { // 当新值大于当前的X 此时发生了掉头
        val = this.snake_X - 10
      } else {
        val = this.snake_X + 10
      }
    }
    this.moveSnake()
    this.snakeHead.style.left = val + 'px'
    this.checkHeadBody()
  }
  set snake_Y(val: number) {
    if (this.snake_Y === val) return

    if (val < 0 || val > 290) { // 毛毛虫完犊子 跑出异常
      throw new Error("毛毛虫撞墙了！！！");
    }

    // * 毛毛虫在向上移动的时候不能向下；反之亦然
    if (this.snakeBodies[1] && (this.snakeBodies[1] as HTMLElement).offsetTop === val) {
      // * 水平方向发生了掉头！！！
      if (val > this.snake_Y) { // 当新值大于当前的X 此时发生了掉头
        val = this.snake_Y - 10
      } else {
        val = this.snake_Y + 10
      }
    }
    this.moveSnake()
    this.snakeHead.style.top = val + 'px'
    this.checkHeadBody()
  }

  // Todo 毛毛虫身体长度更新
  update_shanke_length() {
    // 向sanke里面添加div
    this.snakeElement.insertAdjacentHTML("beforeend", "<div></div>")
  }

  // Todo 毛毛虫移动 每一节的位置为其其前一节的位置
  moveSnake() {
    for (let i = this.snakeBodies.length - 1; i > 0; i--) {
      // 获取前一节身体位置
      let pre_X = (this.snakeBodies[i - 1] as HTMLElement).offsetLeft;
      let pre_Y = (this.snakeBodies[i - 1] as HTMLElement).offsetTop;

      // 设置到当前身体位置
      (this.snakeBodies[i] as HTMLElement).style.left = pre_X + 'px';
      (this.snakeBodies[i] as HTMLElement).style.top = pre_Y + 'px'
    }
  }

  // Todo 检测头部是否与身体相撞
  checkHeadBody() {
    // * 获取所有身体节点遍历 判断头部坐标是否与身体坐标重复
    for (let i = 1; i < this.snakeBodies.length; i++) {
      if (this.snake_X === (this.snakeBodies[i] as HTMLElement).offsetLeft && this.snake_Y === (this.snakeBodies[i] as HTMLElement).offsetTop) {
        // * 说明毛毛虫脑壳儿撞到身体了
        throw new Error("毛毛虫咬到自己了！！！");
      }
    }
  }
}

export default Snake



