# scripts/publish.ps1
# 작성한 포스트를 git에 커밋하고 GitHub에 푸시하는 스크립트

param(
    [string]$Message = ""
)

$ErrorActionPreference = "Stop"

# 프로젝트 루트로 이동 (스크립트 위치 기준)
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

# 1. 변경 사항이 있는지 확인
$changes = git status --porcelain
if (-not $changes) {
    Write-Host ""
    Write-Host "변경된 파일이 없습니다. 작성한 내용이 저장됐는지 확인하세요." -ForegroundColor Yellow
    Write-Host ""
    exit 0
}

# 2. 변경된 파일 목록 보여주기
Write-Host ""
Write-Host "다음 파일이 게시됩니다:" -ForegroundColor Cyan
git status --short
Write-Host ""

# 3. 커밋 메시지 결정
if (-not $Message) {
    # 인자로 메시지 안 받았으면 자동 생성
    $today = Get-Date -Format "yyyy-MM-dd"
    $Message = "post: $today"
}

# 4. 사용자 확인
$confirmation = Read-Host "이대로 게시할까요? (커밋 메시지: '$Message') [Y/n]"
if ($confirmation -eq "n" -or $confirmation -eq "N") {
    Write-Host "취소되었습니다." -ForegroundColor Yellow
    exit 0
}

# 5. add + commit + push
Write-Host ""
Write-Host "1/3 파일 추가 중..." -ForegroundColor Cyan
git add .

Write-Host "2/3 커밋 생성 중..." -ForegroundColor Cyan
git commit -m $Message

Write-Host "3/3 GitHub에 푸시 중..." -ForegroundColor Cyan
git push

Write-Host ""
Write-Host "게시 완료!" -ForegroundColor Green
Write-Host "1~2분 후 https://work-timeline-sand.vercel.app 에 반영됩니다." -ForegroundColor Green
Write-Host ""