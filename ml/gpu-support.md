# 给 Tensorflow 配置 GPU 支持

## CUDA && cuDNN

> NVIDIA® CUDA® 工具包提供了开发环境，可供创建经 GPU 加速的高性能应用。
> NVIDIA CUDA® 深度神经网络库 (cuDNN) 是经 GPU 加速的深度神经网络基元库。

NVIDIA 官网是这么讲的，我也不懂，反正我装上之后 Tensorflow 速度变快了一丝。

Tensorflow 和这俩东西都有一堆的发行版本，随便乱装肯定要炸，所以我们需要三个软件都处在一个比较合适的版本，这里我们可以直接去 tensorflow 官网查，[Build from source on Windows](https://www.tensorflow.org/install/source_windows#gpu)，但是我自己也用 CUDA，不想乱换版本，所以我的方案是：

| Tensorflow | CUDA | cuDNN |
|------------|------|-------|
| 2.8.0      | 11.2 | 8.1.1 |

了解了这些，我们直接下载安装就好了。

1. CUDA Toolkit: <https://developer.nvidia.com/cuda-downloads?target_os=Windows&target_arch=x86_64>
2. cuDNN: <https://developer.nvidia.com/rdp/cudnn-download>

其中 cuDNN 需要注册 Nvidia 开发者账号，该咋整咋整，这里不多提。

## 测试

tensorflow 包里自带了 GPU 支持，此时你大概已经可以用了，打开 Python IEPL，测试一下吧：

```python
import tensorflow
tensorflow.is_gpu_available()
```

如果成功了，输出信息里会有显卡型号，以后用 tf 的时候默认用显卡，以后啥也不用配置了。

最常见的错误就是 dll 缺失，这种情况下就是 CUDA 和 cuDNN 版本不对，卸载重装一个合适的版本就行了。
