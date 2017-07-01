-- stack runghc --package shake

import Development.Shake


main :: IO()
main = shakeArgs shakeOptions { shakeFiles = "_build" } $ do
    want ["public/bundle.js"]

    phony "clean" $ do
        putNormal "Cleaning file in public"
        liftIO $ removeFiles "public" ["//*.js*"]

    phony "build" $
        cmd "dotnet fable yarn-build"

    phony "run" $
        cmd "node public/bundle.js"

    "public/build.js" %> \_ -> do
        need ["src/Program.fs"]
        cmd "dotnet fable yarn-build"


