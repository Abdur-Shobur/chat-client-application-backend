## Thro Error

```ts
if (!Types.ObjectId.isValid(createDevPermissionSubCategoryDto.category)) {
  throw new BadRequestException('Invalid category');
}
```

## Populate

```ts
return await this.DevPermissionSubCategoryModel.findById(id)
  .populate('category', 'name status')
  .lean()
  .exec();
```
