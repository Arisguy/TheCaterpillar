// Todo 定义Food类
class Food {
  element: HTMLElement;
  constructor() {
    this.element = document.getElementById('food')!; // * 获取页面的food元素赋值给element
  };
  // Todo 获取食物的位置信息
  get food_X() {
    return this.element.offsetLeft
  }
  get food_Y() {
    return this.element.offsetTop
  }

  // Todo 判断是否被吃掉之后位置信息需要更改 (随机)
  updatedFoodPosition() {
    // * 随机位置 横向 0 ～ （stage宽度 - food宽度）
    // * 移动一次为snake的宽度/高度 10

    // 获取整10的倍数
    let left_ = Math.round(Math.random() * 30) * 10
    let top_ = Math.round(Math.random() * 30) * 10
    this.element.style.left = left_ + 'px'
    this.element.style.top = top_ + 'px'
  }
}

// 测试代码
// const food = new Food()
// food.updatedFoodPosition()
// console.log(food.food_X, food.food_Y);

export default Food;
