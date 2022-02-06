export default function routes(keyGen) {
	return {
		// student start
		urlStudents: {
			key: keyGen(),
			defaultMessage: '/'
		},
		urlStudentDetail: {
			key: keyGen(),
			defaultMessage: '/app/student/{studentId}/detail'
		},
		urlStudentEdit: {
			key: keyGen(),
			defaultMessage: '/app/student/{studentId}/edit'
		},
		urlStudentAdd: {
			key: keyGen(),
			defaultMessage: '/app/student/add'
		},
		// student end

		// lesson start
		urlLesson: {
			key: keyGen(),
			defaultMessage: '/app/lesson/{studentId}'
		},
		urlLessonDetail: {
			key: keyGen(),
			defaultMessage: '/app/lesson/{lessonId}/{topicsName}/detail'
		},
		urlLessonEdit: {
			key: keyGen(),
			defaultMessage: '/app/lesson/{lessonId}/{topicsName}/edit'
		},
		urlLessonAdd: {
			key: keyGen(),
			defaultMessage: '/app/lesson/add'
		},
		// lesson end

		// bill start
		urlBill: {
			key: keyGen(),
			defaultMessage: '/app/bill/{studentId}'
		},
		urlBillDetail: {
			key: keyGen(),
			defaultMessage: '/app/bill/{billId}/{billNum}/detail'
		},
		urlBillAdd: {
			key: keyGen(),
			defaultMessage: '/app/bill/{studentId}/add'
		},
		// bill end

		// group start
		urlGroup: {
			key: keyGen(),
			defaultMessage: '/app/groups'
		},
		urlGroupAdd: {
			key: keyGen(),
			defaultMessage: '/app/groups/add'
		},
		urlGroupDetail: {
			key: keyGen(),
			defaultMessage: '/app/groups/{groupId}/detail'
		},
		urlGroupEdit: {
			key: keyGen(),
			defaultMessage: '/app/groups/{groupId}/edit'
		},
		// group end

		// teacher start
		urlTeachers: {
			key: keyGen(),
			defaultMessage: '/app/teachers'
		},
		urlTeacherAdd: {
			key: keyGen(),
			defaultMessage: '/app/teacher/add'
		},
		urlTeacherEdit: {
			key: keyGen(),
			defaultMessage: '/app/teacher/{teacherId}/edit'
		},
		urlTeacherDetail: {
			key: keyGen(),
			defaultMessage: '/app/teacher/{teacherId}/detail'
		},
		// teacher end

		// textbooks start
		urlTextbooks: {
			key: keyGen(),
			defaultMessage: '/app/textbooks'
		},
		urlTextbookDetail: {
			key: keyGen(),
			defaultMessage: '/app/textbook/{textbookId}/detail'
		},
		urlTextbookEdit: {
			key: keyGen(),
			defaultMessage: '/app/textbook/{textbookId}/edit'
		},
		urlTextbookAdd: {
			key: keyGen(),
			defaultMessage: '/app/textbook/add'
		},
		// textbooks end

		// more start
		urlMore: {
			key: keyGen(),
			defaultMessage: '/app/withdrawal'
		},

		// more->edit start
		urlMoreEditTopic: {
			key: keyGen(),
			defaultMessage: '/app/more/edit/topics'
		},
		urlMoreEditTextbook: {
			key: keyGen(),
			defaultMessage: '/app/more/edit/textbooks'
		},
		urlMoreEditLevel: {
			key: keyGen(),
			defaultMessage: '/app/more/edit/levels'
		},
		urlMoreEditRoom: {
			key: keyGen(),
			defaultMessage: '/app/more/edit/rooms'
		},
		urlMoreEditLanguage: {
			key: keyGen(),
			defaultMessage: '/app/more/edit/languages'
		},
		urlMoreEditLesson: {
			key: keyGen(),
			defaultMessage: '/app/more/edit/lessons'
		},
		urlMoreEditHeard: {
			key: keyGen(),
			defaultMessage: '/app/more/edit/heards'
		},
		// more->edit end

		// log start
		urlMoreLog: {
			key: keyGen(),
			defaultMessage: '/app/more/log'
		},
		// log end

		// start certification
		urlMoreCertificates: {
			key: keyGen(),
			defaultMessage: '/app/more/certification'
		},
		urlCertificationDetail: {
			key: keyGen(),
			defaultMessage: '/app/more/certification/{certificationId}/detail'
		},
		urlCertificationEdit: {
			key: keyGen(),
			defaultMessage: '/app/certification/{certificationId}/edit'
		},
		urlCertificationAdd: {
			key: keyGen(),
			defaultMessage: '/app/certification/{studentId}/add'
		},
		// end sertification

		urlMoreLibrary: {
			key: keyGen(),
			defaultMessage: '/app/operation'
		},
		urlMoreBell: {
			key: keyGen(),
			defaultMessage: '/app/legal'
		},
		urlMoreUsers: {
			key: keyGen(),
			defaultMessage: '/2fa-login'
		},
		urlMoreObs: {
			key: keyGen(),
			defaultMessage: '/login'
		},
		url2FA: {
			key: keyGen(),
			defaultMessage: '/2fa-login'
		},
		urlLogin: {
			key: keyGen(),
			defaultMessage: '/login'
		},
		urlAdminLogin: {
			key: keyGen(),
			defaultMessage: '/admin/login'
		},
		urlRegister: {
			key: keyGen(),
			defaultMessage: '/register'
		},
		// start exams
		urlMoreExams: {
			key: keyGen(),
			defaultMessage: '/app/more/exams'
		},
		urlMoreExamsEdit: {
			key: keyGen(),
			defaultMessage: '/app/more/exams/{itemId}/{itemType}/edit'
		},
		urlMoreExamsAdd: {
			key: keyGen(),
			defaultMessage: '/app/more/exams/{itemType}/add'
		},
		// end exams
		urlMoreContracts: {
			key: keyGen(),
			defaultMessage: '/app/more/contracts'
		},
		urlContractAdd: {
			key: keyGen(),
			defaultMessage: '/app/more/contracts/add'
		},
		urlContractEdit: {
			key: keyGen(),
			defaultMessage: '/app/more/contracts/{contractId}/edit'
		},
		// more end
	}
}
