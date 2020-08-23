const drawLine = (ctx, startX, startY, endX, endY) => {
  ctx.beginPath()
  ctx.moveTo(startX, startY)
  ctx.lineTo(endX, endY)
  ctx.stroke()
}

const drawArc = (ctx, centerX, centerY, radius, startAngle, endAngle) => {
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, startAngle, endAngle)
  ctx.stroke()
}

const drawPieSlice = (
  ctx,
  centerX,
  centerY,
  radius,
  startAngle,
  endAngle,
  color
) => {
  ctx.fillStyle = color
  ctx.strokeStyle = 'white'
  ctx.lineWidth = 1.2
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(centerX, centerY)
  ctx.arc(centerX, centerY, radius, startAngle, endAngle)
  ctx.closePath()
  ctx.fill()
}

const Piechart = function (options) {
  this.options = options
  this.canvas = options.canvas
  this.ctx = this.canvas.getContext('2d')

  this.draw = function () {
    const total_value = this.options.data.reduce((total, currentCateg) => {
      return total + currentCateg.value
    }, 0)

    let start_angle = 1.5 * Math.PI

    this.options.data.forEach((categ) => {
      val = categ.value
      let slice_angle = (2 * Math.PI * val) / total_value

      drawPieSlice(
        this.ctx,
        this.canvas.width / 2,
        this.canvas.height / 2,
        Math.min(this.canvas.width / 2, this.canvas.height / 2),
        start_angle,
        start_angle + slice_angle,
        categ.color
      )

      start_angle += slice_angle
    })

    
    if (this.options.doughnutHoleSize) {
      drawPieSlice(
        this.ctx,
        this.canvas.width / 2,
        this.canvas.height / 2,
        this.options.doughnutHoleSize *
          Math.min(this.canvas.width / 2, this.canvas.height / 2),
        0,
        2 * Math.PI,
        '#ffffff'
      )
    }
  }
}
