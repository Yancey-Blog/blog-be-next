# GraphQL 客户端 CURD 演示

## findAll

```graphql
{
  announcements {
    _id
    announcement
    updated_at
    created_at
  }
}
```

## findOneById

```graphql
{
  announcement(id: "165527ab-05dd-4933-a663-d156286305b0") {
    _id
    announcement
  }
}
```

## updateOneById

```graphql
mutation UpdateAnnouncement {
  updateAnnouncement(
    id: "165527ab-05dd-4933-a663-d156286305b0"
    announcement: "helloc"
  ) {
    _id
    announcement
  }
}
```

## createOne

```graphql
mutation CreateAnnouncement {
  createAnnouncement(input: { announcement: "fuck" }) {
    _id
    announcement
  }
}
```

## deleteOneById

```graphql
mutation DeleteAnnouncementById {
  deleteAnnouncement(id: "2b1f520b-9e7c-49b5-86a5-fc75dd191ba9") {
    _id
    announcement
  }
}
```

## batchDelete

```graphql
mutation DeleteAnnouncements {
  deleteAnnouncements(
    ids: [
      "165527ab-05dd-4933-a663-d156286305b0"
      "67056708-ba86-4f48-a73d-c9c885cae3ba"
    ]
  ) {
    ok
    n
  }
}
```
