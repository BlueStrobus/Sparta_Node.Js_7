class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.response = response;
    }
}

async function loadJson(url) {
    const response = await fetch(url);
    if (!response.ok) throw new HttpError(response);
    return response.json();
}

async function koreanMovie(retryCount = 3) {
    while (retryCount > 0) {
        try {
            const res = await loadJson('https://klassic-quote-api.mooo.com/v1/random-quote');
            alert(`${res.author}: ${res.quote}`);
            return res;
        } catch (err) {
            if (err instanceof HttpError && err.response.status === 404) {
                alert(`404 에러 발생 - 재시도 남은 횟수: ${retryCount - 1}`);
                retryCount--;
            } else {
                alert("예상치 못한 오류가 발생했습니다:", err);
                throw err;
            }
        }
    }
    alert("재시도 횟수를 초과하였습니다. 나중에 다시 시도해주세요.");
    return null;
}

koreanMovie();
