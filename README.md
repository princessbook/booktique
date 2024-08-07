# Booktique

###

**최종프로젝트 **

## 배포 링크

[Booktique 배포사이트 바로가기](https://www.booktique.xyz/)
<a href="[https://www.booktique.xyz/]" target="_blank"></a>

## 프로젝트 소개

#### 오프라인이 아닌 온라인에서 읽고싶은 책을 읽고 정보 공유를 할수 잇는 사이트

### 개발 기간 : 2024. 03.26 ~ 2024.04.30

## 💻️ 개발 환경

-Environment : vscode, github

-Development : react, javascript

-Database : supabase

-Library : tanstack-query, zustand, tailwindcss

-Design : figma

-Deployment : Vercel

</br>

**# 팀원 소개1**
|김대연|김예린|김철균|황현미|김승희|
|---|---|---|---|---|
|[<img src="https://avatars.githubusercontent.com/u/103303516?v=4" width="100" height="100"/>](https://github.com/rlaedous) [@rlaedous](https://github.com/rlaedous)|[<img src="https://avatars.githubusercontent.com/u/118904207?v=4" width="100" height="100"/>](https://github.com/yeriniii) [@yeriniii](https://github.com/yeriniii)|[<img src="https://avatars.githubusercontent.com/u/97039528?v=4" width="100" height="100"/>](https://github.com/cheolgyun7) [@cheolgyun7](https://github.com/cheolgyun7)|[<img src="https://img.cjthemarket.com/images/file/product/166/20230131131750628.jpg?SF=webp" width="100" height="100"/>](https://github.com/brownrice0916) [@brownrice0916](https://github.com/brownrice0916)|[<img src="https://avatars.githubusercontent.com/u/154486286?v=4" width="100" height="100"/>](https://github.com/HuaHuaChiChi) [@HuaHuaChiChi](https://github.com/HuaHuaChiChi)|
|책읽기<br />타이머(알람)|마이페이지<br />내 북클럽|로그인,회원가입<br />채팅창|북클럽만들기<br />퀴즈|책검색및 api<br />자유게시판|

<br>

**# 시작 가이드**

- 설치가이드

```
git clone https://github.com/princessbook/booktique.git
yarn
yarn dev
```

**# 페이지 소개**

- 로그인, 회원가입
- 마이페이지
- 내 북클럽
- 책 읽기
- 북클럽 찾기

<br/>

</br>

#### 배포하기

- Vercel 이라는 호스팅플랫폼을 이용해 배포합니다.
- 배포에 적용될 브랜치는 main 또는 master 브랜치로 적용합니다.

## ERD(Entity Relationship Diagram)

![image](https://github.com/princessbook/booktique/assets/97039528/7c5a1b69-3fe7-403f-b911-da6c494003f9)

## 프로젝트 구조

<details>
<summary>📦 src 폴더 구조 보기</summary>

```
📦src
┣ 📂app
┃ ┣ 📂(navigationBar)
┃ ┃ ┣ 📂board
┃ ┃ ┃ ┣ 📂detail
┃ ┃ ┃ ┃ ┗ 📂[postId]
┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┗ 📂posting
┃ ┃ ┃ ┃ ┗ 📂[postId]
┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┣ 📂bookclubs
┃ ┃ ┃ ┣ 📂create
┃ ┃ ┃ ┃ ┣ 📂search
┃ ┃ ┃ ┃ ┃ ┣ 📜SearchForm.tsx
┃ ┃ ┃ ┃ ┃ ┣ 📜SearchModal.tsx
┃ ┃ ┃ ┃ ┃ ┗ 📜SearchResult.tsx
┃ ┃ ┃ ┃ ┣ 📜page.tsx
┃ ┃ ┃ ┃ ┗ 📜ReactSelectBar.tsx
┃ ┃ ┃ ┣ 📂[id]
┃ ┃ ┃ ┃ ┣ 📜BackBtn.tsx
┃ ┃ ┃ ┃ ┣ 📜BookClubCSR.tsx
┃ ┃ ┃ ┃ ┣ 📜JoinAndResignBtn.tsx
┃ ┃ ┃ ┃ ┣ 📜JoinBtn.tsx
┃ ┃ ┃ ┃ ┣ 📜Members.tsx
┃ ┃ ┃ ┃ ┣ 📜page.tsx
┃ ┃ ┃ ┃ ┗ 📜ResignBtn.tsx
┃ ┃ ┃ ┣ 📜ClubAdminProfile.tsx
┃ ┃ ┃ ┣ 📜ClubMembersCount.tsx
┃ ┃ ┃ ┣ 📜ClubSearch.tsx
┃ ┃ ┃ ┣ 📜layout.tsx
┃ ┃ ┃ ┣ 📜page.tsx
┃ ┃ ┃ ┗ 📜SearchInput.tsx
┃ ┃ ┣ 📂my-clubs
┃ ┃ ┃ ┣ 📂[clubId]
┃ ┃ ┃ ┃ ┣ 📂info
┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┃ ┣ 📂posts
┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┃ ┣ 📂quizzes
┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┃ ┣ 📂sentences
┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┃ ┣ 📜ClubSelector.tsx
┃ ┃ ┃ ┃ ┗ 📜layout.tsx
┃ ┃ ┃ ┣ 📜layout.tsx
┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┣ 📂mypage
┃ ┃ ┃ ┣ 📂mybookclubs
┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┣ 📂mysentences
┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┣ 📂[userId]
┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┣ 📜layout.tsx
┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┣ 📂readbook
┃ ┃ ┃ ┣ 📂[id]
┃ ┃ ┃ ┃ ┣ 📂[save]
┃ ┃ ┃ ┃ ┃ ┣ 📜page.tsx
┃ ┃ ┃ ┃ ┃ ┣ 📜SaveBookInfo.tsx
┃ ┃ ┃ ┃ ┃ ┣ 📜SaveCard.tsx
┃ ┃ ┃ ┃ ┃ ┣ 📜SaveProgressBar.tsx
┃ ┃ ┃ ┃ ┃ ┗ 📜Timer.tsx
┃ ┃ ┃ ┃ ┣ 📜BookInfo.tsx
┃ ┃ ┃ ┃ ┣ 📜CompleteModal.tsx
┃ ┃ ┃ ┃ ┣ 📜EndButton.tsx
┃ ┃ ┃ ┃ ┣ 📜EndModal.tsx
┃ ┃ ┃ ┃ ┣ 📜layout.tsx
┃ ┃ ┃ ┃ ┣ 📜MemberList.tsx
┃ ┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┃ ┣ 📜ClubList.tsx
┃ ┃ ┃ ┣ 📜layout.tsx
┃ ┃ ┃ ┣ 📜page.tsx
┃ ┃ ┃ ┣ 📜ProgressBar.tsx
┃ ┃ ┃ ┗ 📜ReadButton.tsx
┃ ┃ ┗ 📜layout.tsx
┃ ┣ 📂api
┃ ┃ ┣ 📂getBookInfo
┃ ┃ ┃ ┗ 📂[id]
┃ ┃ ┃ ┃ ┗ 📜route.ts
┃ ┃ ┗ 📂[keyword]
┃ ┃ ┃ ┗ 📜route.ts
┃ ┣ 📂auth
┃ ┃ ┣ 📂callback
┃ ┃ ┃ ┗ 📜route.ts
┃ ┃ ┣ 📂confirm
┃ ┃ ┃ ┗ 📜route.ts
┃ ┃ ┗ 📜authAPI.ts
┃ ┣ 📂bookclubs
┃ ┃ ┗ 📜ClubSearch.tsx
┃ ┣ 📂chat
┃ ┃ ┗ 📂[id]
┃ ┃ ┃ ┣ 📜ChatInput.tsx
┃ ┃ ┃ ┗ 📜page.tsx
┃ ┣ 📂login
┃ ┃ ┣ 📜action.ts
┃ ┃ ┗ 📜page.tsx
┃ ┣ 📂register
┃ ┃ ┣ 📂set-nickname
┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┣ 📂set-profile-image
┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┗ 📜page.tsx
┃ ┣ 📜globals.css
┃ ┣ 📜layout.tsx
┃ ┣ 📜not-found.tsx
┃ ┣ 📜page.tsx
┃ ┗ 📜provider.tsx
┣ 📂common
┃ ┣ 📂constants
┃ ┃ ┣ 📜bookCategories.ts
┃ ┃ ┗ 📜tableNames.ts
┃ ┣ 📜Button.tsx
┃ ┣ 📜Input.tsx
┃ ┣ 📜LoadingOverlay.tsx
┃ ┗ 📜ToastUi.tsx
┣ 📂components
┃ ┣ 📂common
┃ ┃ ┣ 📜Animation.tsx
┃ ┃ ┣ 📜HeaderWithBack.tsx
┃ ┃ ┗ 📜NoContentMessage.tsx
┃ ┣ 📂header
┃ ┃ ┣ 📜Header.tsx
┃ ┃ ┗ 📜page.tsx
┃ ┣ 📂login
┃ ┃ ┗ 📜LoginForm.tsx
┃ ┣ 📂my-clubs
┃ ┃ ┣ 📂board
┃ ┃ ┃ ┣ 📂boardDetail
┃ ┃ ┃ ┃ ┣ 📜ArticleComment.tsx
┃ ┃ ┃ ┃ ┣ 📜ArticleCommentInput.tsx
┃ ┃ ┃ ┃ ┣ 📜ArticleTimeStamp.tsx
┃ ┃ ┃ ┃ ┗ 📜BoardDetailArticle.tsx
┃ ┃ ┃ ┣ 📂posting
┃ ┃ ┃ ┃ ┗ 📜PhotoSection.tsx
┃ ┃ ┃ ┗ 📜Board.tsx
┃ ┃ ┣ 📂info
┃ ┃ ┃ ┣ 📜ClubBook.tsx
┃ ┃ ┃ ┣ 📜HomeTab.tsx
┃ ┃ ┃ ┣ 📜MemberCard.tsx
┃ ┃ ┃ ┣ 📜Members.tsx
┃ ┃ ┃ ┣ 📜NonMyClub.tsx
┃ ┃ ┃ ┣ 📜ResignBtn.tsx
┃ ┃ ┃ ┗ 📜WithdrawalPopup.tsx
┃ ┃ ┣ 📂sentences
┃ ┃ ┃ ┣ 📜SentenceModal.tsx
┃ ┃ ┃ ┣ 📜Sentences.tsx
┃ ┃ ┃ ┣ 📜SentenceStorage.tsx
┃ ┃ ┃ ┗ 📜SentenceUser.tsx
┃ ┃ ┗ 📜QuizArchiving.tsx
┃ ┣ 📂mypage
┃ ┃ ┣ 📂clubs
┃ ┃ ┃ ┣ 📜AllMyBookClubs.tsx
┃ ┃ ┃ ┣ 📜BookClubItem.tsx
┃ ┃ ┃ ┗ 📜MyBookClub.tsx
┃ ┃ ┣ 📂profile
┃ ┃ ┃ ┣ 📜LogoutButton.tsx
┃ ┃ ┃ ┣ 📜Profile.tsx
┃ ┃ ┃ ┗ 📜ProfileDetail.tsx
┃ ┃ ┗ 📂sentences
┃ ┃ ┃ ┣ 📜AllMySentences.tsx
┃ ┃ ┃ ┣ 📜MySentencesStore.tsx
┃ ┃ ┃ ┗ 📜SentenceItem.tsx
┃ ┣ 📂navigationBar
┃ ┃ ┗ 📜page.tsx
┃ ┣ 📂nickname
┃ ┃ ┗ 📜MyNicknameForm.tsx
┃ ┣ 📂quiz
┃ ┃ ┣ 📜MultipleChoiceQuizComponent.tsx
┃ ┃ ┣ 📜QuizAnswer.tsx
┃ ┃ ┣ 📜QuizContainer.tsx
┃ ┃ ┣ 📜QuizModal.tsx
┃ ┃ ┣ 📜QuizQuestion.tsx
┃ ┃ ┣ 📜QuizShortAnswer.tsx
┃ ┃ ┗ 📜ShortQuizComponent.tsx
┃ ┣ 📂realtime
┃ ┃ ┣ 📜ChatBackImg.tsx
┃ ┃ ┣ 📜ChatInfo.tsx
┃ ┃ ┣ 📜ChatMessages.tsx
┃ ┃ ┣ 📜ChatPresence.tsx
┃ ┃ ┣ 📜ListMessages.tsx
┃ ┃ ┣ 📜LoadMoreMessages.tsx
┃ ┃ ┣ 📜Message.tsx
┃ ┃ ┗ 📜OtherMessage.tsx
┃ ┗ 📂register
┃ ┃ ┗ 📜RegisterForm.tsx
┣ 📂hooks
┃ ┣ 📂Board
┃ ┃ ┗ 📜useRelativeTime.tsx
┃ ┣ 📂info
┃ ┃ ┗ 📜useMyClubInfo.tsx
┃ ┣ 📂mypage
┃ ┃ ┣ 📜useUserClubs.tsx
┃ ┃ ┗ 📜useUserSentences.tsx
┃ ┣ 📜fetchDB.ts
┃ ┣ 📜useInput.ts
┃ ┣ 📜usePostDataEffect.ts
┃ ┗ 📜useRealtimePostgresChanges.ts
┣ 📂lib
┃ ┣ 📂constant
┃ ┃ ┗ 📜index.ts
┃ ┣ 📂types
┃ ┃ ┣ 📜BookAPI.ts
┃ ┃ ┗ 📜supabase.ts
┃ ┗ 📜utils.ts
┣ 📂store
┃ ┣ 📜index.ts
┃ ┣ 📜InitMessages.tsx
┃ ┣ 📜InitUser.tsx
┃ ┣ 📜messages.ts
┃ ┣ 📜modalstore.ts
┃ ┣ 📜user.ts
┃ ┗ 📜zustandStore.ts
┣ 📂utils
┃ ┣ 📂api
┃ ┃ ┗ 📜authAPI.ts
┃ ┣ 📂bookAPIs
┃ ┃ ┗ 📜bookAPI.ts
┃ ┣ 📂middlewares
┃ ┃ ┣ 📜authToken.ts
┃ ┃ ┣ 📜chain.ts
┃ ┃ ┣ 📜middleware.ts
┃ ┃ ┗ 📜protectRoute.ts
┃ ┣ 📂postAPIs
┃ ┃ ┣ 📂postCommentAPIs
┃ ┃ ┃ ┗ 📜commentAPI.ts
┃ ┃ ┗ 📜postAPI.ts
┃ ┣ 📂supabase
┃ ┃ ┣ 📜client.ts
┃ ┃ ┗ 📜server.ts
┃ ┣ 📂userAPIs
┃ ┃ ┣ 📜authAPI.ts
┃ ┃ ┣ 📜Fns.ts
┃ ┃ ┗ 📜storageAPI.ts
┃ ┣ 📜dateUtils.ts
┃ ┣ 📜getCallBackURL.ts
┃ ┣ 📜nicknameGenerator.ts
┃ ┣ 📜testAPIs.ts
┃ ┣ 📜time.ts
┃ ┣ 📜timeUtils.ts
┃ ┗ 📜validation.ts
┗ 📜middleware.ts
```

</details>

## 실제 구현 화면 (Mobile 375x815[아이폰13mini])

|                                                       로그인 화면                                                       |                                                     내 북클럽 화면                                                      |
| :---------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/princessbook/booktique/assets/97039528/87863b8b-34b8-41cc-9d07-e0ee000b7edd" width="100%"> | <img src="https://github.com/princessbook/booktique/assets/97039528/18552947-bc07-4639-b1a2-594d66e1f94c" width="100%"> |
|                                                       책읽기 화면                                                       |                                                    북클럽 찾기 화면                                                     |
| <img src="https://github.com/princessbook/booktique/assets/97039528/485b44be-da19-4e21-9fea-d416f188035e" width="100%"> | <img src="https://github.com/princessbook/booktique/assets/97039528/80fc67e7-a3c6-4b14-9a00-0b7d559e14ff" width="100%"> |
|                                                     마이페이지 화면                                                     |                                                        퀴즈 화면                                                        |
| <img src="https://github.com/princessbook/booktique/assets/97039528/e502eb87-f0d9-4019-bffd-69e3b947519f" width="100%"> | <img src="https://github.com/princessbook/booktique/assets/97039528/f4c196f5-34bd-4557-99b5-d556cfd126b5" width="100%"> |

## 📄 화면 구성 및 기능

### 1.로그인/회원가입

|                                                         로그인                                                         |                                                        회원가입                                                        |
| :--------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/princessbook/booktique/assets/97039528/87863b8b-34b8-41cc-9d07-e0ee000b7edd" width="50%"> | <img src="https://github.com/princessbook/booktique/assets/97039528/40d3f04d-f658-42e4-8963-954e501dcc46" width="50%"> |
|                                             sns로그인 또는 email로 로그인                                              |                                 회원가입시 유효성 검사를 마쳐야 회원가입이 되도록 설정                                 |

### 2.북클럽 찾기(북클럽 찾기, 북클럽 만들기)

|                                                                                                                 북클럽 찾기                                                                                                                  |                                                     북클럽 만들기                                                      |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/princessbook/booktique/assets/97039528/80fc67e7-a3c6-4b14-9a00-0b7d559e14ff" width="25%"><img src="https://github.com/princessbook/booktique/assets/97039528/1c252691-945a-479c-9587-2fdf39a19c9d" width="25%"> | <img src="https://github.com/princessbook/booktique/assets/97039528/96c5438c-f61b-40ea-abf5-faab68828ec0" width="50%"> |
|                                       - 로그인후 해당페이지로 리다이렉트<br />-카테고리별로 북클럽 찾기 가능하고 무한스크롤을 이용하여 <br /> 원하는 북클럽이 나올때까지 렌더링시킬 수 있습니다.<br />                                       |                원하는 책을 파일첨부하고 모집인원수 책에 대한 간단한 소개를한 뒤 북클럽을 만들 수 있다.                 |

### 3.내 북클럽(정보,문장저장소, 퀴즈, 자유게시판)

|                                                          정보                                                          |                                                                                                                 문장 저장소                                                                                                                  |
| :--------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/princessbook/booktique/assets/97039528/18552947-bc07-4639-b1a2-594d66e1f94c" width="50%"> | <img src="https://github.com/princessbook/booktique/assets/97039528/50981102-0a2c-44c1-bc85-4b8e62995908" width="25%"><img src="https://github.com/princessbook/booktique/assets/97039528/a7f581e1-b781-4e83-9db2-e54439b01626" width="25%"> |
|                                             sns로그인 또는 email로 로그인                                              |                                                                                            회원가입시 유효성 검사를 마쳐야 회원가입이 되도록 설정                                                                                            |
