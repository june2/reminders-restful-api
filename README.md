# Reminders

![Screenshot](/screenshot1.png)

이 프로젝트의 목적은 iOS나 macOS 디바이스들에 기본으로 포함된 Reminders  앱의 기본적인 기능을 구현하는 RESTFul API를 만드는 것 입니다. Reminders 앱을 사용해본 적이 없는 경우를 위해 간략히 설명하면, 여러개의 Reminder 리스트(ReminderList)에 여러개의 아이템(ReminderListItem)을 추가할 수 있으며 각 ReminderListItem은 이름, 상태, 생성 날짜로 구성되고 이름과 상태는 추가 후 수정할 수 있습니다. RESTFul API는 ReminderList와 ReminderListItem에 대한 기본적인 CRUD 작업을 처리해야 합니다.

## Guidelines
* 제한 시간은 최대 2시간 입니다.
* macOS Reminders 앱을 잠시 사용해 보시는 것을 추천드립니다.
* Boilerplate, Starter Kit 등을 사용해서 프로젝트 시작하셔도 됩니다.
* 자체 Test 또는 Postman 등으로 테스트까지 가능한 결과물이어야 합니다.
* 단위 작업 후에 최대한 Git Commit 하면서 작업해 주세요.

## ReminderList 예시
```javascript
{
  "id": "<unique id>",
  "name": "Grocery Store",
  "created_at": "2018-09-08T00:00:00.000+09:00"
}
```

## ReminderListItem 예시
```javascript
{
  "id": "<unique id>",
  "list_id": "<list unique id>",
  "name": "Milk",
  "status": "to do",
  "created_at": "2018-09-08T00:00:00.000+09:00",
  "remind_at": "2018-09-10T00:00:00.000+09:00"
}
```

## ReminderList

### CREATE: Add a new ReminderList to the database and return the newly added ReminderList
#### POST /reminder_list
#### body
```javascript
{
  "name": "Grocery Store"
}
```
#### response
```javascript
{
  "id": "<unique id>",
  "name": "Grocery Store",
  "created_at": "2018-09-08T00:00:00.000+09:00"
}
```

### READ: Return an array of ReminderLists, sorted by created_date descending
#### GET /reminder_list
#### response
```javascript
{
  "lists": [
    // ReminderList objects
  ]
}
```
* sort by created_at descending

### UPDATE: Edit the name of an existing ReminderList and return the updated ReminderList (id and created_at are read only)
#### PATCH /reminder_list/:list_id
#### body
```javascript
{
  // ReminderList object
}
```
#### response
```javascript
{
  // ReminderList object
}
```

### DESTROY: Remove an existing ReminderList and return a success message upon successful deletion
#### DELETE /reminder_list/:list_id


## ReminderListItem

### CREATE: Add a new ReminderListItem to an existing ReminderList and return the newly added ReminderListItem
#### POST /reminder_list/:list_id/item
#### body
```javascript
{
  // ReminderListItem object
}
```
#### response
```javascript
{
  // ReminderListItem object
}
```

### READ: Return an array of all ReminderListItems for a given ReminderList, sorted by remind_at descending
#### GET /reminder_list/:list_id/item
#### response
```javascript
{
  "items": [
    // ReminderListItem objects
  ]
}
```

* The status variable has two possible values: "to do" (default), and "completed"


### UPDATE: Edit the name, status, and/or remind_at for an existing ReminderListItem and return the updated ReminderListItem (id and created_at are read only)
#### PATCH /reminder_list/:list_id/item/:item_id
#### body
```javascript
{
  // ReminderListItem object
}
```
#### response
```javascript
{
  // ReminderListItem object
}
```

### DESTROY: Remove an existing ReminderListItem and return a success message upon successful deletion
#### DELETE /reminder_list/:list_id/item/:item_id
* 실제 삭제하지는 않고 status를 deleted로 변경한다.
