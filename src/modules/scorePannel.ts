
// Todo 定义Score-pannel类
class ScorePannel {
  score: number = 0
  level: number = 0

  maxLevel: number  // 该变量限制等级
  scoreSwitch: number // 该变量表示多少分时升级

  scoreElement: HTMLElement;
  levelElement: HTMLElement;
  constructor(maxLevel: number = 10, scoreSwitch: number = 10) {
    this.scoreElement = document.getElementById('score')!;
    this.levelElement = document.getElementById('level')!;
    this.maxLevel = maxLevel
    this.scoreSwitch = scoreSwitch
  }
  // * 更新分数
  updateScore() {
    this.score++
    this.scoreElement.innerHTML = this.score + ''


    if (this.score % this.scoreSwitch === 0) {
      this.updateLevel()
    }
  }
  // * 更新等级
  updateLevel() {
    console.log('是否执行更新级别方法', this.level);

    if (this.level < this.maxLevel) {
      this.level++
      this.levelElement.innerHTML = this.level + ''
    }

  }
}

// 验证
// const scorepannel = new ScorePannel(100, 5)
// for (let index = 0; index < 100; index++) {
//   scorepannel.updateScore()
// }


export default ScorePannel;
