# MNIST

> 本篇涉及的示例可以在 Google Colab 查看：<https://colab.research.google.com/github/AkaraChen/blog/blob/main/source/_posts/learn/ml/day-3/mnist.ipynb>

本篇的目的是解决 mnist 问题，作为我深度学习路上的 `hello,world`。首先先导入 mnist 的数据集：

```python
from keras.datasets import mnist
(train_images,train_lables),(test_images,test_lables) = mnist.load_data()
```

train_images 和 train_labels 组成了**训练集（training set）**，模型在这些数据中学习，然后在**测试集（test set）**，即 test_images 和 test_labels 中对模型进行测试 ，图像被编码为 Numpy 数组，而标签则是数字数组，取值范围 0-9，图像和图片一一对应。

## 构建神经网络

明白了这些，现在我们要构建网络了。

```python
from keras import models,layers
network = models.Sequential()
network.add(layers.Dense(512,activation='relu'))
network.add(layers.Dense(10,activation='softmax'))
```

首先我们构建了一个神经网络，然后我们为它创建了两个层（layer），它是一种数据处理模块。本例中的网络包含了两个 Dense 层，他们是密集链接（又叫全连接）的神经层。第二层是一个10路的softmax层，它将会返回十个概率值组成的数组，每个概率值表示当前数字图像属于10个数字类别中的某一个的概率。
想要训练网络，我们还需要选择编译步骤的三个参数：

1. **损失函数（loss function）**：网络如何衡量训练数据上的性能，即如何让网络朝着正确的方向前进
2. **优化器（optimizer）**：基于训练数据和损失函数来更新网络的机制
3. **在训练和测试过程中需要监控的指标（metric）**：本例只关心正确分类图像所占的比例

```python
network.compile(optimizer='rmsprop',
loss='categorical_crossentropy',
metrics=['accuracy'])
```

## 数据预处理

看起来我们的网络已经构建完成了，接下来我们需要对数据进行预处理，将其变换为网络要求的形状，即从 60000 个图片组成的数组，转成 28*28 的矩阵，并缩放到所有值（[0,255]区间）到[0,1]区间。

```python
train_images=train_images.reshape((60000, 28 * 28))
train_images=train_images.astype('float32') / 255
test_images=test_images.reshape((10000, 28 * 28))
test_images=test_images.astype('float32') / 255
```

接下来要对便签进行分类编码

```python
from tensorflow.keras.utils import to_categorical
train_lables = to_categorical(train_lables)
test_lables = to_categorical(test_lables)
```

## 训练

然后，开始拟合模型吧。

```python
network.fit(train_images,train_lables,epochs=5,batch_size=128)
```

然后你就能看到进度条一直在跑了，大约过去了数秒，训练数据的精度就到达了 99%，此时我还没开 GPU 加速，所以速度很慢。

## 测试

然后我们用测试集测试下成果：

```python
test_loss,test_acc=network.evaluate(test_images,test_lables)
print('test_acc:',test_acc)
```

测试集的精度才在98%左右，比训练集低了不少，这种差距是**过拟合（overfit）**造成的，过拟合是指机器学习模型在新数据上的性能往往比训练数据上要差。
第一个例子就此结束了，我的第一个神经网络，用不到20行代码对手写数字进行分类，完成了。
