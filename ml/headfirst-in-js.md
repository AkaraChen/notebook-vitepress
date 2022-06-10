# 第一行代码

晚上抽空学了下 Tenserflow.js，照着书写了这么个 demo，用于预测文件下载的耗时，概念模糊不清，就不详细解释概念了，之后 CSS 和深度学习的话题可能同步进行，不过之后就是用 Python 了。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <script src="https://cdn.bootcdn.net/ajax/libs/tensorflow/3.14.0/tf.min.js"> </script>
    <script>
        const train = {
            "size": [
                0.080, 9.000, 0.001, 0.100, 8.000,
                5.000, 0.100, 6.000, 0.050, 0.500,
                0.002, 2.000, 0.005, 10.00, 0.010,
                7.000, 6.000, 5.000, 10.00, 1.000
            ],
            "time": [
                0.135, 0.739, 0.067, 0.126, 0.646,
                0.435, 0.069, 0.497, 0.068, 0.116,
                0.070, 0.289, 0.076, 0.744, 0.083,
                0.560, 0.480, 0.399, 0.153, 0.149
            ]
        }

        const test = {
            "size": [
                5.000, 0.200, 0.001, 9.000, 0.002,
                0.020, 0.008, 4.000, 0.001, 1.000,
                0.005, 0.080, 0.800, 0.200, 0.050,
                7.000, 0.005, 0.002, 8.000, 0.008
            ],
            "time": [
                0.425, 0.098, 0.052, 0.686, 0.066,
                0.078, 0.070, 0.375, 0.058, 0.136,
                0.052, 0.063, 0.183, 0.087, 0.066,
                0.558, 0.066, 0.068, 0.610, 0.057
            ]
        }

        const trainTensors = {
            size: tf.tensor2d(train.size, [20, 1]),
            time: tf.tensor2d(train.time, [20, 1])
        }

        const testTensors = {
            size: tf.tensor2d(test.size, [20, 1]),
            time: tf.tensor2d(test.time, [20, 1])
        }

        const model = tf.sequential();
        model.add(tf.layers.dense({ inputShape: [1], units: 1 }));
        model.compile({ optimizer: 'sgd', loss: 'meanAbsoluteError' });

        model.fit(trainTensors.size,trainTensors.time,{ epochs: 200 })
        
        async function predict(value) {
            (await model).predict(tf.tensor2d([[value]])).print()
        }

        predict("1")

    </script>
</body>

</html>
```
