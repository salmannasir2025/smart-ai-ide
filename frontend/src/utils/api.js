import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export async function chatLocal(model, prompt) {
  try {
    const res = await axios.post(`${BASE_URL}/chat/local`, { model, prompt });
    return res.data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function chatOpenAI(prompt) {
  try {
    const res = await axios.post(`${BASE_URL}/chat/openai`, { prompt });
    return res.data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function findBugs(code) {
  try {
    const res = await axios.post(`${BASE_URL}/bugfinder/`, { code });
    return res.data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function listRepos(token) {
  try {
    const res = await axios.get(`${BASE_URL}/github/repos`, {
      headers: { Authorization: `token ${token}` },
    });
    return res.data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function listRepoContents(token, fullRepoName) {
  try {
    // fullRepoName format: owner/repo
    const res = await axios.get(`${BASE_URL}/github/repos/${fullRepoName}/contents`, {
      headers: { Authorization: `token ${token}` },
    });
    return res.data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function getFileContent(token, fullRepoName, filePath) {
  try {
    const res = await axios.get(`${BASE_URL}/github/repos/${fullRepoName}/contents/${filePath}`, {
      headers: { Authorization: `token ${token}` },
    });
    return res.data;
  } catch (error) {
    return { error: error.message };
  }
}
