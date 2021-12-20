pipeline {
    agent any
    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '30'))
    }
    stages {
        stage("Checkout code") {
            steps {
                deleteDir()
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], userRemoteConfigs: [[url: 'https://github.com/HanmingWu-TW/Testcafe-sample.git', credentialsId: 'ftms-github-ssh']]])
            }
        }

        stage('Testcafe Test') {
            steps {
                nodejs(nodeJSInstallationName: 'node') {
                    sh 'npm i'
                    sh 'node index.js'
                }
                archiveArtifacts artifacts: '*.html'
                archiveArtifacts artifacts: 'error/*.png'
            }
        }

        stage("Publish Report") {
            steps {
                publishHTML (
                    target : [
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: '.',
                        reportFiles: 'web-chrome-report.html',
                        reportName: '测试报告',
                        reportTitles: '测试报告'
                    ]
                )
            }
        }
    }
}