import { UserProfile } from "../entities/user-profile";

export const setupChangeProfilePicture =
  (fileStorage, crypto, userProfileRepo) =>
  async ({ userId, file }) => {
    const key = crypto.uuid({ key: userId });
    const data = {};

    if (file !== undefined) {
      const fileExtension = file.mimeType.split("/")[1];

      data.pictureUrl = await fileStorage.upload({
        file: file.buffer,
        fileName: `${key}.${fileExtension}`,
      });
    } else {
      data.name = (await userProfileRepo.load({ id: userId }))?.name;
    }

    const userProfile = new UserProfile(userId);
    userProfile.setPicture(data);

    try {
      await userProfileRepo.savePicture(userProfile);
    } catch (error) {
      if (file !== undefined) await fileStorage.delete({ fileName: key });
      throw error;
    }

    return userProfile;
  };
