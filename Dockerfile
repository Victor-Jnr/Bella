FROM nvidia/cuda:12.4.0-devel-ubuntu22.04

RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    python3-pip \
    nvidia-utils-545 \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgomp1 \
    libgtk-3-dev \
    libgcc-s1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

# Set default command (can be changed as needed)
CMD ["/bin/bash"]
# To run the container with unlimited memory, port mapping, workspace mount, and a specific name:
# docker run -it --gpus all -v /mnt/c/git/Bella:/workspace --init --net=host --uts=host --ipc=host --name Bella_dev --security-opt seccomp=unconfined --ulimit stack=67108864 --ulimit memlock=-1 --privileged bella_dev:latest