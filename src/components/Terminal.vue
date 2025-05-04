<template>
  <div class="terminal-container" @click="handleClick">
    <div class="terminal-header">
      <div class="terminal-button" style="background-color: #ff5f56"></div>
      <div class="terminal-button" style="background-color: #ffbd2e"></div>
      <div class="terminal-button" style="background-color: #27c93f"></div>
      <div class="terminal-title">terminal - portfolio</div>
    </div>
    
    <div class="terminal-body" ref="terminalBody">
      <div v-for="(item, index) in history" :key="index">
        <div v-if="item.type === 'command'" class="line">
          <span class="prompt">{{ item.prompt }}</span>
          <span class="command">{{ item.content }}</span>
        </div>
        <div v-else class="output" :style="{ color: item.color }">
          {{ item.content }}
        </div>
      </div>
      
      <div class="input-line">
        <span class="prompt">{{ prompt }}</span>
        <input 
          ref="inputRef"
          type="text" 
          v-model="input" 
          @keydown="handleKeyDown" 
          class="input"
          autofocus 
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, nextTick } from 'vue';
import { executeCommand } from '../utils/commands';

export default {
  name: 'Terminal',
  setup() {
    const history = ref([]);
    const input = ref('');
    const prompt = ref('visitor@portfolio:~$');
    const inputRef = ref(null);
    const terminalBody = ref(null);

    // 初始欢迎消息
    onMounted(() => {
      const welcomeMessage = [
        {
          type: 'output',
          content: `欢迎来到我的个人主页！\n\n输入 'help' 查看可用命令。`,
          color: '#8be9fd'
        }
      ];
      history.value = welcomeMessage;
    });

    // 自动滚动到底部
    watch(history, () => {
      nextTick(() => {
        if (terminalBody.value) {
          terminalBody.value.scrollTop = terminalBody.value.scrollHeight;
        }
      });
    });

    // 自动聚焦输入框
    onMounted(() => {
      inputRef.value.focus();
    });

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        const command = input.value.trim();
        
        // 添加命令到历史记录
        const newHistory = [...history.value, {
          type: 'command',
          prompt: prompt.value,
          content: command
        }];
        
        // 执行命令并获取输出
        const output = executeCommand(command);
        
        // 处理清除屏幕命令
        if (output.content === 'CLEAR_TERMINAL') {
          history.value = [];
          input.value = '';
          return;
        }
        
        // 添加输出到历史记录
        newHistory.push({
          type: 'output',
          content: output.content,
          color: output.color
        });
        
        history.value = newHistory;
        input.value = '';
        
        // 确保DOM更新后立即滚动到底部
        nextTick(() => {
          if (terminalBody.value) {
            terminalBody.value.scrollTop = terminalBody.value.scrollHeight;
          }
        });
      }
    };

    const handleClick = () => {
      inputRef.value.focus();
    };

    return {
      history,
      input,
      prompt,
      inputRef,
      terminalBody,
      handleKeyDown,
      handleClick
    };
  }
};
</script>

<style scoped>
.terminal-container {
  width: 100%;
  max-width: 900px;
  height: 600px;
  background-color: #282a36;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.terminal-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #44475a;
}

.terminal-button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
}

.terminal-title {
  margin-left: 10px;
  font-size: 14px;
  color: #bd93f9;
}

.terminal-body {
  flex: 1;
  overflow-y: auto;
  font-size: 16px;
  line-height: 1.5;
  padding-right: 10px;
}

.terminal-body::-webkit-scrollbar {
  width: 8px;
}

.terminal-body::-webkit-scrollbar-track {
  background: #282a36;
}

.terminal-body::-webkit-scrollbar-thumb {
  background: #44475a;
  border-radius: 4px;
}

.line {
  margin-bottom: 8px;
}

.prompt {
  color: #50fa7b;
  margin-right: 10px;
}

.command {
  color: #f8f8f2;
}

.output {
  color: #f8f8f2;
  margin-top: 5px;
  margin-bottom: 15px;
  white-space: pre-wrap;
}

.input-line {
  display: flex;
  margin-top: 5px;
}

.input {
  flex: 1;
  background: transparent;
  border: none;
  color: #f8f8f2;
  font-family: 'Fira Code', monospace;
  font-size: 16px;
  outline: none;
  caret-color: #f8f8f2;
}
</style>