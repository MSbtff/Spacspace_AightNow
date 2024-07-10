"use server";

import { ChatTogetherAI } from "@langchain/community/chat_models/togetherai";
import { createOpenAIFunctionsAgent, AgentExecutor } from "langchain/agents";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import type { ChatPromptTemplate } from "@langchain/core/prompts";
import { pull } from "langchain/hub";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { stockAction4 } from "./stockAction";

// ai report
export async function agentChatTogether(id: string) {
  const search = new TavilySearchResults({
    maxResults: 2,
  });

  const retriever = await search.invoke(`최근 ${id} 주식`);

  const tools = [search];
  const prompt = await pull<ChatPromptTemplate>("hwchase17/openai-functions-agent");

  // 1. 모델 초기화
  const llm = new ChatTogetherAI({
    model: "meta-llama/Llama-3-8b-chat-hf",
    temperature: 0.3,
    topP: 0.3,
    apiKey: process.env.TOGETHER_API_KEY,
  });

  // 2. 도구 정의
  const stockAnalysisTool = new DynamicStructuredTool({
    name: "stock_analysis",
    description: "주식에 대한 상세한 분석 데이터를 제공합니다.",
    schema: z.object({
      stockName: z.string().describe(id),
    }),
    func: async () => {
      try {
        const stockInfo = await stockAction4();
        return JSON.stringify(stockInfo);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        return JSON.stringify({ error: "Failed to fetch stock data" });
      }
    },
  });

  const agent = await createOpenAIFunctionsAgent({
    llm,
    tools,
    prompt,
  });

  // 3. Agent 초기화
  const executor = new AgentExecutor({
    agent,
    tools,
    maxIterations: 1,
  });

  // 4. Agent 실행
  const result = await executor.invoke({
    input: `${retriever}를 참고해서 ${id} 주식에 대해 분석해서 4줄짜리 애널리스트 보고서를 한글로 작성해줘. 절대로5줄 넘지마 제목이나 부가 설명 없이 바로 본문 내용만 작성해.`,
  });
  const cleanOutput = result.output
    .replace(/^Here is a 4-line analyst report in Korean:\s*/, "")
    .replace(/^.*본문:\s*/, "")
    .trim();
  console.log(cleanOutput);
  return cleanOutput;
}

// --------------------------------------------------------------------------------------------

// ai 점수 평가
export async function agentEvaluationTogether(id: string) {
  const search = new TavilySearchResults({
    maxResults: 2,
  });

  const retriever = await search.invoke(`최근 ${id} 주식`);

  const tools = [search];
  const prompt = await pull<ChatPromptTemplate>("hwchase17/openai-functions-agent");

  // 1. 모델 초기화
  const llm = new ChatTogetherAI({
    model: "meta-llama/Llama-3-8b-chat-hf",
    temperature: 0.3,
    topP: 0.3,
    apiKey: process.env.TOGETHER_API_KEY,
  });

  // 2. 도구 정의
  const stockAnalysisTool = new DynamicStructuredTool({
    name: "stock_analysis",
    description: "주식에 대한 상세한 분석 데이터를 제공합니다.",
    schema: z.object({
      stockName: z.string().describe(id),
    }),
    func: async () => {
      try {
        const stockInfo = await stockAction4();
        return JSON.stringify(stockInfo);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        return JSON.stringify({ error: "Failed to fetch stock data" });
      }
    },
  });

  const agent = await createOpenAIFunctionsAgent({
    llm,
    tools: [...tools, stockAnalysisTool],
    prompt,
  });

  // 3. Agent 초기화
  const executor = new AgentExecutor({
    agent,
    tools: [...tools, stockAnalysisTool],
    maxIterations: 1,
  });

  // 4. Agent 실행
  const result = await executor.invoke({
    input: `${retriever}를 참고하여 ${id} 주식에 대해 ${stockAnalysisTool} 도구를 사용하여 상세 데이터를 가져온 후, 다음 기준에 따라 분석 리포트를 작성해주세요:

    투자지수 평가 기준:

    1. 전반적 평가: (긍정/중립/부정)
    2. 수익성: (높음/중간/낮음)
    3. 관심도: (상승/평균/하락)
    4. 성장성: (상승/평균/하락)
    5. 주가: (상승/일정/하락)
    6. 총점: 각 평가 항목에 대해 100점 만점 중 점수로 평가하고, 총 평균 점수를 계산해주세요.

    각 항목에 대해 평가를 제시하고 마지막에 총점을 제시해주세요.
    한글로 작성해주세요. 제목이나 부가 설명 없이 바로 본문 내용만 작성해주세요.`,
  });

  const cleanOutput = result.output.trim();

  const parseResult = (text: string) => {
    const lines = text.split("\n");
    const result: Record<string, string | number> = {};
    lines.forEach(line => {
      const [key, value] = line.split(":").map(s => s.trim());
      if (key === "총점") {
        result[key] = parseFloat(value);
      } else {
        result[key] = value;
      }
    });
    return result;
  };

  const parsedResult = parseResult(cleanOutput);
  console.log(parsedResult);
  return parsedResult;
}
