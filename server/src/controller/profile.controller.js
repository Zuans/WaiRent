const tagModel = require("../model/tag.model");
const userModel = require("../model/user.model");


class ProfileController {

    async main(req,res) {
        const token = req.cookies.token || null;
        let user = token ? await userModel.findByJWT(token) : null;
       
        const { 
            fav_tag_1,
            fav_tag_2,
            fav_tag_3,
            ...userProfile
        } = user;

        const favTags = [fav_tag_1,fav_tag_2,fav_tag_3];
        const tags = await tagModel.findTags(favTags);
        userProfile.tags = tags;

        const allTag = await tagModel.getAllTag();

        res.render("routes/profile/main",{
            title : "Main Profile",
            user : userProfile,
            allTag
        });
    }

    async resetPassword() {
        const token = req.cookies.token || null;
        const user = token ? await userModel.findByJWT(token) : null;
        
        res.render("routest/profile/reset-password",{
            user,
        })
    }
}



module.exports = new ProfileController